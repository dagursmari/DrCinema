import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchMovies } from "@/src/redux/slices/movies-slice";
import { fetchCinemas } from "@/src/redux/slices/cinemas-slice";
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";
import styles from "./styles";
import type { Cinema, Movie } from "@/src/redux/types";

// Type for cinema with its movies
interface CinemaWithMovies {
  cinema: Cinema;
  movies: Movie[];
}

export function HomeScreenView() {
  const dispatch = useAppDispatch();

  // Get data from Redux
  const { movies, loading: moviesLoading, error: moviesError } = useAppSelector(
    (state) => state.movies
  );
  const { cinemas, loading: cinemasLoading, error: cinemasError } = useAppSelector(
    (state) => state.cinemas
  );

  // Local state for search
  const [searchText, setSearchText] = useState("");

  // Fetch data on mount
  useEffect(() => {
    console.log("🏠 HomeScreen: Fetching data...");
    dispatch(fetchMovies());
    dispatch(fetchCinemas());
  }, [dispatch]);

  // Group movies by cinema and apply search filter
  const getFilteredCinemasWithMovies = (): CinemaWithMovies[] => {
    const lowerSearch = searchText.toLowerCase().trim();

    return cinemas
      .map((cinema) => {
        const cinemaMovies = movies.filter((movie) => {
          const hasShowtimeAtCinema = movie.showtimes?.some(
            (showtime) => showtime.cinema.id === cinema.id
          );

          if (!hasShowtimeAtCinema) return false;

          if (lowerSearch) {
            return movie.title.toLowerCase().includes(lowerSearch);
          }

          return true;
        });

        const uniqueMovies = Array.from(
          new Map(cinemaMovies.map((movie) => [movie.id, movie])).values()
        );

        return {
          cinema,
          movies: uniqueMovies,
        };
      })
      .filter((item) => item.movies.length > 0)
      .sort((a, b) => a.cinema.name.localeCompare(b.cinema.name));
  };

  const filteredCinemas = getFilteredCinemasWithMovies();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const isLoading = moviesLoading || cinemasLoading;
  const error = moviesError || cinemasError;

  // ---------- RENDER ----------

  if (isLoading) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      </ScreenWithFooter>
    );
  }

  if (error) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>❌ Error: {error}</Text>
        </View>
      </ScreenWithFooter>
    );
  }

  if (filteredCinemas.length === 0) {
    return (
      <ScreenWithFooter>
        <View style={styles.container}>
          <SearchBarComp onSearch={handleSearch} />
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {searchText ? `No movies found for "${searchText}"` : "No movies available"}
            </Text>
          </View>
        </View>
      </ScreenWithFooter>
    );
  }

  // Success
  return (
    <ScreenWithFooter>
      <View style={styles.container}>
        <SearchBarComp onSearch={handleSearch} />

        <FlatList
          data={filteredCinemas}
          renderItem={({ item }) => (
            <CinemaSectionComp cinema={item.cinema} movies={item.movies} />
          )}
          keyExtractor={(item) => item.cinema.id.toString()}
          style={styles.list}
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 16 }} // small gap above footer
        />
      </View>
    </ScreenWithFooter>
  );
}
