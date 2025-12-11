import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

import MovieShowtimesCard from "@/src/components/movie-showtimes-card/MovieShowtimeCard";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchCinemaById } from "@/src/redux/slices/cinemas-slice";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";

import type { Cinema, Movie } from "@/src/redux/types";
import styles from "./styles";

export function CinemaDetailsScreenView() {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  useEffect(() => {
    if (!cinema && !Number.isNaN(cinemaId)) {
      dispatch(fetchCinemaById(cinemaId));
    }
  }, [cinema, cinemaId, dispatch]);

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

    const handlePressMovie = (movie: Movie) => {
    router.push({
        pathname: "/movie-screen",
        params: {
        id: movie.id.toString(),
        cinemaId: cinemaId.toString(),
        },
    });
    };

    const handleWebsitePress = () => {
      if (!cinema?.website) return;

      let url = cinema.website.trim();

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      Linking.openURL(url);
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

        <TouchableOpacity onPress={handleWebsitePress}>
        {cinema.website && (
          <View style={styles.infoRow}>
            <Feather name="link-2" size={18} color="#FF748B" />
            <Text style={[styles.infoText, styles.linkText]} numberOfLines={1}>
              {cinema.website}
            </Text>
          </View>
        )}
        </TouchableOpacity>

        {/* Now showing */}
        {nowShowing.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Now showing</Text>

            {nowShowing.map((movie) => (
              <MovieShowtimesCard
                key={movie.id}
                movie={movie}
                cinemaId={cinemaId}
                onPress={() => handlePressMovie(movie)}
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
