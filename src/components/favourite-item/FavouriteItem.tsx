import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import type { Movie } from "@/src/redux/types";

type Props = {
  movie: Movie;
  onPress: () => void;
  onRemove: () => void;
  onLongPress: () => void;
  isActive: boolean;
};

export default function FavouriteItem({
  movie,
  onPress,
  onRemove,
  onLongPress,
  isActive,
}: Props) {
  const genre = movie.genres?.[0]?.Name;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, isActive && styles.cardActive]}
    >
      <View style={styles.handle}>
        <Feather name="menu" size={20} color="#C4C4C4" />
      </View>

      <Image source={{ uri: movie.poster }} style={styles.poster} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.year}>{movie.year}</Text>
          {genre && <Text style={styles.genre}> • {genre}</Text>}
        </View>
      </View>

      <Pressable onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeText}>X</Text>
      </Pressable>
    </Pressable>
  );
}
