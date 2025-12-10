import React, { useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchCinemaById } from "@/src/redux/slices/cinemas-slice";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";
import MovieShowtimesCard from "@/src/components/movie-showtimes-card/MovieShowtimeCard";

import styles from "./styles";
import type { Cinema, Movie } from "@/src/redux/types";

export function CinemaDetailsScreenView() {
  const dispatch = useAppDispatch();
  const router = useRouter();                      // 👈 NEW

  const { id } = useLocalSearchParams<{ id?: string }>();
  const cinemaId = id ? parseInt(id, 10) : NaN;

  const { cinemas, loading: cinemasLoading, error: cinemasError } = useAppSelector(
    (state) => state.cinemas
  );
  const { movies, loading: moviesLoading, error: moviesError } = useAppSelector(
    (state) => state.movies
  );

  const cinema: Cinema | undefined = useMemo(
    () => cinemas.find((c) => c.id === cinemaId),
    [cinemas, cinemaId]
  );

  // Fetch cinema details if not in store yet
  useEffect(() => {
    if (!cinema && !Number.isNaN(cinemaId)) {
      dispatch(fetchCinemaById(cinemaId));
    }
  }, [cinema, cinemaId, dispatch]);

  // Movies that are showing in this cinema (DEDUPED by movie.id)
  const nowShowing: Movie[] = useMemo(() => {
    if (Number.isNaN(cinemaId)) return [];

    const filtered = movies.filter((movie) =>
      movie.showtimes?.some((showtime) => showtime.cinema.id === cinemaId)
    );

    const uniqueMap = new Map<number, Movie>();
    filtered.forEach((movie) => {
      if (!uniqueMap.has(movie.id)) {
        uniqueMap.set(movie.id, movie);
      }
    });

    return Array.from(uniqueMap.values());
  }, [movies, cinemaId]);

  const isLoading = cinemasLoading || moviesLoading;
  const error = cinemasError || moviesError;

  // 👇 handler to go to movie-screen
    const handlePressMovie = (movie: Movie) => {
    router.push({
        pathname: "/movie-screen",
        params: {
        id: movie.id.toString(),
        cinemaId: cinemaId.toString(),   // 👈 NEW
        },
    });
    };


  if (isLoading && !cinema) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={styles.loadingText}>Loading cinema...</Text>
        </View>
      </ScreenWithFooter>
    );
  }

  if (!cinema || error) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            {error ? `❌ ${error}` : "Cinema not found"}
          </Text>
        </View>
      </ScreenWithFooter>
    );
  }

  return (
    <ScreenWithFooter>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cinema header */}
        <Text style={styles.cinemaName}>{cinema.name}</Text>

        {cinema.description && (
          <Text style={styles.description}>{cinema.description}</Text>
        )}

        {/* Info rows */}
        {cinema.address && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#FF748B" />
            <Text style={styles.infoText}>{cinema.address}</Text>
          </View>
        )}

        {cinema.phone && (
          <View style={styles.infoRow}>
            <Feather name="phone" size={18} color="#FF748B" />
            <Text style={styles.infoText}>{cinema.phone}</Text>
          </View>
        )}

        {cinema.website && (
          <View style={styles.infoRow}>
            <Feather name="link-2" size={18} color="#FF748B" />
            <Text style={[styles.infoText, styles.linkText]} numberOfLines={1}>
              {cinema.website}
            </Text>
          </View>
        )}

        {/* Now showing */}
        {nowShowing.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Now showing</Text>

            {nowShowing.map((movie) => (
              <MovieShowtimesCard
                key={movie.id}
                movie={movie}
                cinemaId={cinemaId}
                onPress={() => handlePressMovie(movie)}      // 👈 HERE
              />
            ))}
          </>
        )}

        {nowShowing.length === 0 && (
          <Text style={styles.emptyText}>No showtimes available.</Text>
        )}
      </ScrollView>
    </ScreenWithFooter>
  );
}
