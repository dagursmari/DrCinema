import type { Cinema, Movie } from "@/src/redux/types";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface MovieCardProps {
  movie: Movie;
  cinema: Cinema;
}

export default function MovieCard({ movie, cinema }: MovieCardProps) {
  const getFirstGenre = () => {
    if (!movie.genres || movie.genres.length === 0) {
      return "Unknown";
    }

    const genre = movie.genres[0];

    return genre["NameEN\t"] || genre.Name || "Unknown";
  };

  const handlePress = () => {
    router.push(`/movie-screen?id=${movie.id}&cinemaId=${cinema.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />
     </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
       </Text>

       <Text style={styles.year}>{movie.year}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getFirstGenre()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}