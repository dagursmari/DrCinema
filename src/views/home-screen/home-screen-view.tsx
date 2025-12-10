import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchCinemas } from "@/src/redux/slices/cinemas-slice";
import { fetchMovies } from "@/src/redux/slices/movies-slice";
import type { Cinema, Movie } from "@/src/redux/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";
import styles from "./styles";

interface CinemaWithMovies {
  cinema: Cinema;
  movies: Movie[];
}

export function HomeScreenView() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { movies, loading: moviesLoading, error: moviesError } = useAppSelector(
    (state) => state.movies
  );
  const { cinemas, loading: cinemasLoading, error: cinemasError } = useAppSelector(
    (state) => state.cinemas
  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("🏠 HomeScreen: Fetching data...");
    dispatch(fetchMovies());
    dispatch(fetchCinemas());
  }, [dispatch]);

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
            const movieTitle = movie.title.toLowerCase();
            return movieTitle.startsWith(lowerSearch);
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
    console.log("Search text:", text);
    setSearchText(text);
  };

  const handleFilterPress = () => {
    // TODO: Implement filter functionality
    console.log("Filter pressed - functionality coming soon!");
  };

  const isLoading = moviesLoading || cinemasLoading;
  const error = moviesError || cinemasError;

  if (isLoading) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E94560" />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      </ScreenWithFooter>
    );
  }

  if (error) {
    return (
      <ScreenWithFooter>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>⚠️ Error: {error}</Text>
        </View>
      </ScreenWithFooter>
    );
  }

  if (filteredCinemas.length === 0) {
    return (
      <ScreenWithFooter>
        <View style={styles.container}>
          <SearchBarComp 
            onSearch={handleSearch}
            onFilterPress={handleFilterPress}
          />
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {searchText ? `No movies found for "${searchText}"` : "No movies available"}
            </Text>
          </View>
        </View>
      </ScreenWithFooter>
    );
  }

  return (
    <ScreenWithFooter>
      <View style={styles.container}>
        <SearchBarComp 
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
        />
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
          contentContainerStyle={{ 
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWithFooter>
  );
}