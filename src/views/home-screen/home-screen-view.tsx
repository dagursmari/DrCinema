import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import { FilterButton, FilterComp, Filters } from "@/src/components/filter/filter";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchCinemas } from "@/src/redux/slices/cinemas-slice";
import { fetchMovies } from "@/src/redux/slices/movies-slice";
import type { Cinema, Movie } from "@/src/redux/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, Text, TouchableOpacity, View } from "react-native";
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

  const [filters, setFilters] = useState<Filters>({});
  const [showFilter, setShowFilter] = useState(false);

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

        // Search filter
        if (lowerSearch) {
          const movieTitle = movie.title.toLowerCase();
          if (!movieTitle.startsWith(lowerSearch)) return false;
        }

        // Rating filters
        if (filters.imdbRating) {
          const imdbRating = parseFloat(movie.ratings?.imdb || "0");
          if (imdbRating < filters.imdbRating) {
            return false;
          }
        }

        if (filters.rottenRating) {
          const audienceScore = parseFloat(movie.ratings?.rotten_audience || "0");
          const criticsScore = parseFloat(movie.ratings?.rotten_critics || "0");
          const maxScore = Math.max(audienceScore, criticsScore);
          
          if (maxScore < filters.rottenRating) {
            return false;
          }
        }

        // Actor filter
        if (filters.actor && !movie.actors_abridged?.some(a => 
          a.name.toLowerCase().includes(filters.actor!.toLowerCase())
        )) {
          return false;
        }

        // Director filter
        if (filters.director && !movie.directors_abridged?.some(d => 
          d.name.toLowerCase().includes(filters.director!.toLowerCase())
        )) {
          return false;
        }

        // Certificate filter
        if (filters.certificate) {
          const userValue = parseInt(filters.certificate, 10);
          const movieValue = parseInt(movie.certificate?.number ?? "0", 10);

          // If the movie's rating is higher than the user input → exclude it
          if (movieValue > userValue) {
            return false;
          }
        }
        
        // Showtime filter - ONLY if user specified a time range
        if (filters.showtimeFrom || filters.showtimeTo) {
          const showtimeAtCinema = movie.showtimes?.find(st => st.cinema.id === cinema.id);
          const schedule = showtimeAtCinema?.schedule || [];
          
          // If no schedule for this cinema, exclude the movie
          if (schedule.length === 0) {
            return false;
          }
          
          const timeMatch = schedule.some(sch => {
            let time = sch.time.trim();
            
            // Remove everything after space or parenthesis
            if (time.includes(" ")) {
              time = time.split(" ")[0];
            }
            if (time.includes("(")) {
              time = time.split("(")[0].trim();
            }
            
            // Validate time format
            if (!time.includes(":")) {
              return false;
            }
            
            const timeParts = time.split(":");
            if (timeParts.length < 2) {
              return false;
            }
            
            const hours = timeParts[0].padStart(2, "0");
            const minutes = timeParts[1].padStart(2, "0");
            time = `${hours}:${minutes}`;
            
            // Compare times
            if (filters.showtimeFrom && time < filters.showtimeFrom) {
              return false;
            }
            if (filters.showtimeTo && time > filters.showtimeTo) {
              return false;
            }
            
            return true;
          });
          
          if (!timeMatch) {
            return false;
          }
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

  const handleFilterPress = () => {
    setShowFilter((prev) => !prev);
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
        <View style={styles.searchandfilter}>
          <SearchBarComp onSearch={handleSearch} style={{ flex: 1 }} />
          <FilterButton onPress={() => setShowFilter(prev => !prev)} />
        </View>

        {showFilter && (
          <FilterComp 
            onApplyFilters={(newFilters) => {
              setFilters(newFilters);
              setShowFilter(false);
            }}
            onClose={() => setShowFilter(false)}
          />
        )}

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
        <View style={styles.searchandfilter}>
        <SearchBarComp onSearch={handleSearch} style={{ flex: 1 }} />
        <FilterButton onPress={() => setShowFilter(prev => !prev)} />
      </View>

      {showFilter && (
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={() => Keyboard.dismiss()}
        style={{ marginHorizontal: 0 }}
      >
        <FilterComp 
          onApplyFilters={(newFilters) => {
            setFilters(newFilters);
            setShowFilter(false);
          }}
          onClose={() => setShowFilter(false)}
        />
      </TouchableOpacity>
    )}
          
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