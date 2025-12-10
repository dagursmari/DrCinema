import type { Movie } from "@/src/redux/types";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import styles from "./styles";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // FIX: Extract the genre NAME from the genre object
  const getFirstGenre = () => {
    if (!movie.genres || movie.genres.length === 0) {
      return "Unknown";
    }
    
    // The API has a weird tab character in the key name
    const genre = movie.genres[0];
    return genre["NameEN\t"] || genre.Name || "Unknown";
  };

  const movieId = useLocalSearchParams()

  const handlePress = () => {
    console.log("Movie pressed:", movie.id);
    // TODO: Navigate to movie detail
    router.push(
        `/movie-screen?id=${movie.id}`
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Card>
        <Card.Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />

        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        
        <Text style={styles.year}>{movie.year}</Text>
        
        {/* FIX: Display the genre NAME, not the object */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getFirstGenre()}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}