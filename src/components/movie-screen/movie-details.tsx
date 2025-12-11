import { useAppSelector } from "@/src/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { RatingsSection } from "../ratings/rating-section";
import { ShowtimesSection } from "../showtimes/showtimes-section";
import { TrailerPlayer } from "../trailer/trailerplayer";
import styles from "./styles";

import type { Movie } from "@/src/redux/types";
import {
  AddFavourite,
  BuildUserFavouritesKey,
  GetFavourites,
  RemoveFavourite,
} from "@/src/services/favourites-storage";

export default function MovieDetailsComp() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const userKey = BuildUserFavouritesKey(user);
  const { id, cinemaId } =
    useLocalSearchParams<{ id?: string; cinemaId?: string }>();

  const movie: Movie | undefined = useAppSelector((state) =>
    state.movies.movies.find((m) => m.id === Number(id))
  );

  const isLoggedIn = useAppSelector(
  (state) => !!state.auth.user
  );

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavourite = async () => {
      if (!movie || !userKey) {
        setIsFavourite(false);

        return;
      }
      const favs = await GetFavourites(userKey);
      const exists = favs.some((m) => m.id === movie.id);
      setIsFavourite(exists);
    };

    checkFavourite();
  }, [movie?.id, userKey]);


  if (!movie) {
    return <Text>Movie not found</Text>;
  }

  const omdbData = movie.omdb?.[0];
  const writers = omdbData?.Writer
    ? omdbData.Writer.split(",").map((w) => w.trim())
    : [];

  const hasCinemaParam = !!cinemaId;
  const selectedCinemaId = cinemaId ? Number(cinemaId) : null;

  const cinemaShowtime = hasCinemaParam
    ? movie.showtimes?.find((st) => st.cinema.id === selectedCinemaId)
    : undefined;

  const trailers = movie.trailers?.[0]?.results ?? [];

  const officialTrailer =
    trailers.find((trailer) =>
      trailer.name.toLowerCase().includes("official trailer")
    ) ?? null;

  const handleFavoritePress = async () => {
    if (!movie) return;

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
      await RemoveFavourite(userKey, movie.id);
      setIsFavourite(false);
    } else {
      await AddFavourite(userKey, movie);
      setIsFavourite(true);
    }
  };


  const handleBackPress = () => {
    router.back();
  };

  const certificate = movie.omdb?.[0]?.Rated || "N/A";

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={28}
            color={isFavourite ? "#E94560" : "#C4C4C4"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.posterContainer}>
        <Image style={styles.poster} source={{ uri: movie.poster }} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>


      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{movie.durationMinutes}</Text>
          <Text style={styles.infoLabel}>Minutes</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{certificate}</Text>
          <Text style={styles.infoLabel}>Rating</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{movie.year}</Text>
          <Text style={styles.infoLabel}>Year</Text>
        </View>
      </View>

      {/* Plot */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plot</Text>
        <Text style={styles.sectionText}>{movie.plot}</Text>
      </View>

      {/* Credits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credits</Text>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Director:</Text>
          <Text style={styles.creditValue}>
            {movie.directors_abridged?.map((director, index) => (
              <Text key={index}>
                {director.name}
                {index < movie.directors_abridged.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Writers:</Text>
          <Text style={styles.creditValue}>{writers.join(", ") || "N/A"}</Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Starring:</Text>
          <Text style={styles.creditValue}>
            {movie.actors_abridged?.map((actor, index) => (
              <Text key={index}>
                {actor.name}
                {index < movie.actors_abridged.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Country:</Text>
          <Text style={styles.creditValue}>
            {movie.omdb?.[0]?.Country ?? "N/A"}
          </Text>
        </View>
      </View>

      {/* Ratings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ratings</Text>
        <RatingsSection ratings={movie.ratings} />
      </View>

      {/* Genres */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genresContainer}>
          {movie.genres?.map((genre, index) => (
            <View style={styles.genreBadge} key={index}>
              <Text style={styles.genreBadgeText}>{genre.Name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Showtimes</Text>

        {hasCinemaParam ? (
          cinemaShowtime ? (
            <ShowtimesSection
              showtimes={[
                {
                  cinema: cinemaShowtime.cinema,
                  schedule: cinemaShowtime.schedule,
                },
              ]}
            />
          ) : (
            <Text style={styles.noShowtimesText}>
              No showtimes available for this cinema
            </Text>
          )
        ) :
        movie.showtimes && movie.showtimes.length > 0 ? (
          movie.showtimes.map((st) => (
            <View key={st.cinema.id} style={styles.cinemaShowtimesBlock}>
              <ShowtimesSection
                showtimes={[
                  {
                    cinema: st.cinema,
                    schedule: st.schedule,
                  },
                ]}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noShowtimesText}>
            No showtimes available.
          </Text>
        )}
      </View>

      {/* Trailer */}
      <View style={styles.section}>
        <TrailerPlayer trailer={officialTrailer} />
      </View>
    </View>
  );
}
