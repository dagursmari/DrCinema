import type { Cinema, Movie } from "@/src/redux/types";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MovieCard from "../movie-card/movie-card";
import styles from "./styles";

interface CinemaSectionProps {
  cinema: Cinema;
  movies: Movie[];
}

export function CinemaSectionComp({ cinema, movies }: CinemaSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.cinemaName}>{cinema.name}</Text>

      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${cinema.id}-${item.id}`}
        contentContainerStyle={styles.moviesList}
        renderItem={({ item }) => (
          <MovieCard movie={item} cinema={cinema} />
        )}
      />
    </View>
  );
}