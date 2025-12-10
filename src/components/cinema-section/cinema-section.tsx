import type { Cinema, Movie } from "@/src/redux/types";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MovieCard from "../movie-card/movie-card";
import styles from "./styles";

interface CinemaSectionProps {
  cinema: Cinema;
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
}

export function CinemaSectionComp({ cinema, movies, onMoviePress}: CinemaSectionProps) {
    

  return (
    <View style={styles.section}>
      {/* Cinema Name */}
      <Text style={styles.cinemaName}>{cinema.name}</Text>

      {/* Movies List */}
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${cinema.id}-${item.id}`}
        contentContainerStyle={styles.moviesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}>
            <MovieCard movie={item} />             
          </TouchableOpacity>
        )}
      />
    </View>
  );
}