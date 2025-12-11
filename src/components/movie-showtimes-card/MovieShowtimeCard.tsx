import type { Movie, ShowtimeSchedule } from "@/src/redux/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

import {
  addFavourite,
  getFavourites,
} from "@/src/services/favourites-storage"; // ✅ make sure this exists

type Props = {
  movie: Movie;
  cinemaId: number;
  onPress?: () => void;
};

export default function MovieShowtimesCard({
  movie,
  cinemaId,
  onPress,
}: Props) {
  const [isFavourite, setIsFavourite] = useState(false);

  // ✅ Load if this movie is already in favourites
  useEffect(() => {
    const checkFavourite = async () => {
      const favs = await getFavourites();
      const exists = favs.some((m) => m.id === movie.id);
      setIsFavourite(exists);
    };

    checkFavourite();
  }, [movie.id]);

  const scheduleEntries: ShowtimeSchedule[] =
    movie.showtimes
      ?.filter((s) => s.cinema.id === cinemaId)
      .flatMap((s) => s.schedule) ?? [];

  const firstGenreName = movie.genres?.[0]?.Name;

  const formatTime = (raw: string) => raw.split(" ")[0].trim();

  // ✅ Heart press handler
  const handleFavouritePress = async () => {
    await addFavourite(movie);
    setIsFavourite(true); // ✅ fill heart immediately
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.year}>{movie.year}</Text>
          {firstGenreName && (
            <>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.genre}>{firstGenreName}</Text>
            </>
          )}
        </View>

        <View style={styles.showtimesRow}>
          {scheduleEntries.map((entry, index) => (
            <View
              key={`${movie.id}-${cinemaId}-${entry.purchase_url}-${index}`}
              style={styles.chip}
            >
              <Text style={styles.chipText}>
                {formatTime(entry.time)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ❤️ FAVOURITE BUTTON */}
      <Pressable style={styles.favouriteButton} onPress={handleFavouritePress}>
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={20}
          color={isFavourite ? "#FF748B" : "#D1D1D1"} // ✅ filled vs outline look
        />
      </Pressable>
    </Pressable>
  );
}
