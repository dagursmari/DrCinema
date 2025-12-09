import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchMovies } from "@/src/redux/slices/movies-slice";
import { fetchCinemas } from "@/src/redux/slices/cinemas-slice";
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import { ScreenWithFooter } from "../footer/footer";
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
        // Find all movies that have showtimes at this cinema
        const cinemaMovies = movies.filter((movie) => {
          // Check if movie has showtimes at this cinema
          const hasShowtimeAtCinema = movie.showtimes?.some(
            (showtime) => showtime.cinema.id === cinema.id
          );

          if (!hasShowtimeAtCinema) return false;

          // If there's a search term, filter by title
          if (lowerSearch) {
            return movie.title.toLowerCase().includes(lowerSearch);
          }

          return true;
        });

        // FIX: Deduplicate movies by ID
        const uniqueMovies = Array.from(
          new Map(cinemaMovies.map(movie => [movie.id, movie])).values()
        );

        return {
          cinema,
          movies: uniqueMovies,
        };
      })
      // Remove cinemas with no movies
      .filter((item) => item.movies.length > 0)
      // Sort cinemas alphabetically
      .sort((a, b) => a.cinema.name.localeCompare(b.cinema.name));
  };

  const filteredCinemas = getFilteredCinemasWithMovies();

  // Handle search input
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Loading state
  if (moviesLoading || cinemasLoading) {
    return (
      <ScreenWithFooter>
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#e50914" />
            <Text style={styles.loadingText}>Loading movies...</Text>
          </View>
        </SafeAreaView>
      </ScreenWithFooter>
    );
  }

  // Error state
  if (moviesError || cinemasError) {
    return (
      <ScreenWithFooter>
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>
              ❌ Error: {moviesError || cinemasError}
            </Text>
          </View>
        </SafeAreaView>
      </ScreenWithFooter>
    );
  }

  // Empty state (no movies found)
  if (filteredCinemas.length === 0) {
    return (
      <ScreenWithFooter>
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
          <View>
            <SearchBarComp onSearch={handleSearch} />
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {searchText ? `No movies found for "${searchText}"` : "No movies available"}
            </Text>
          </View>
        </SafeAreaView>
      </ScreenWithFooter>
    );
  }

  // Success - render the list
  return (
    <ScreenWithFooter>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <View>
          <SearchBarComp onSearch={handleSearch} />
        </View>

        <FlatList
          data={filteredCinemas}
          renderItem={({ item }) => (
            <CinemaSectionComp 
              cinema={item.cinema} 
              movies={item.movies} 
            />
          )}
          keyExtractor={(item) => item.cinema.id.toString()}
          style={styles.list}
          contentContainerStyle={{ paddingTop: 0 }}
        />
      </SafeAreaView>
    </ScreenWithFooter>
  );
}