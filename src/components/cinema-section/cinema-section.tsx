import React from "react";
import { View, Text, FlatList } from "react-native";
import MovieCard from "../movie-card/movie-card";
import type { Cinema, Movie } from "@/src/redux/types";
import styles from "./styles";

interface CinemaSectionProps {
  cinema: Cinema;
  movies: Movie[];
}

export function CinemaSectionComp({ cinema, movies }: CinemaSectionProps) {
  return (
    <View style={styles.section}>
      {/* Cinema Name */}
      <Text style={styles.cinemaName}>{cinema.name}</Text>

      {/* Movies List */}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        // FIX: Make key unique by combining cinema ID + movie ID
        keyExtractor={(item) => `${cinema.id}-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesList}
      />
    </View>
  );
}