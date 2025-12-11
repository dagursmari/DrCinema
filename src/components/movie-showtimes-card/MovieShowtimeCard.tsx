import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import styles from "./styles";
import type { Movie, ShowtimeSchedule } from "@/src/redux/types";
import { useAppSelector } from "@/src/redux/hooks";

import {
  getFavourites,
  addFavourite,
  removeFavourite,
  buildUserFavouritesKey,
} from "@/src/services/favourites-storage";

type Props = {
  movie: Movie;
  cinemaId: number;
  onPress?: () => void;
};

export default function MovieShowtimesCard({ movie, cinemaId, onPress }: Props) {
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const userKey = buildUserFavouritesKey(user);

  const [isFavourite, setIsFavourite] = useState(false);

  const scheduleEntries: ShowtimeSchedule[] =
    movie.showtimes
      ?.filter((s) => s.cinema.id === cinemaId)
      .flatMap((s) => s.schedule) ?? [];

  const firstGenreName = movie.genres?.[0]?.Name;

  const formatTime = (raw: string) => raw.split(" ")[0].trim();

  useEffect(() => {
    const checkFavourite = async () => {
      if (!userKey) {
        setIsFavourite(false);
        return;
      }
      const favs = await getFavourites(userKey);
      const exists = favs.some((m) => m.id === movie.id);
      setIsFavourite(exists);
    };

    checkFavourite();
  }, [movie.id, userKey]);

  const handleFavouritePress = async () => {
    if (!isLoggedIn || !userKey) {
      Alert.alert(
        "Sign in required",
        "You need to be signed in to add favourites.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Sign in", onPress: () => router.push("/login") },
        ]
      );
      return;
    }

    if (isFavourite) {
      await removeFavourite(userKey, movie.id);
      setIsFavourite(false);
    } else {
      await addFavourite(userKey, movie);
      setIsFavourite(true);
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Poster */}
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </View>

        {/* Year • Genre */}
        <View style={styles.metaRow}>
          <Text style={styles.year}>{movie.year}</Text>
          {firstGenreName && (
            <>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.genre}>{firstGenreName}</Text>
            </>
          )}
        </View>

        {/* Showtimes */}
        <View style={styles.showtimesRow}>
          {scheduleEntries.map((entry, index) => (
            <View
              key={`${movie.id}-${cinemaId}-${entry.purchase_url}-${index}`}
              style={styles.chip}
            >
              <Text style={styles.chipText}>{formatTime(entry.time)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Favourite button */}
      <Pressable style={styles.favouriteButton} onPress={handleFavouritePress}>
        <Ionicons
          name= { isFavourite? "heart" : "heart-outline"}
          size={18}
          color={isFavourite ? "#E94560" : "#C4C4C4"}
        />
      </Pressable>
    </Pressable>
  );
}
