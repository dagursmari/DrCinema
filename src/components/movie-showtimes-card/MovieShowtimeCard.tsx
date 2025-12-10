import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import type { Movie, ShowtimeSchedule } from "@/src/redux/types";

type Props = {
  movie: Movie;
  cinemaId: number;
  onPress?: () => void;      // 👈 NEW
};

export default function MovieShowtimesCard({ movie, cinemaId, onPress }: Props) {
  // All showtime schedule entries for this cinema
  const scheduleEntries: ShowtimeSchedule[] =
    movie.showtimes
      ?.filter((s) => s.cinema.id === cinemaId)
      .flatMap((s) => s.schedule) ?? [];

  // First genre name (Icelandic)
  const firstGenreName = movie.genres?.[0]?.Name;

  // Helper: clean time string, remove "(1)" etc.
  const formatTime = (raw: string) => {
    return raw.split(" ")[0].trim();
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Poster */}
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </View>

        {/* Year • Genre */}
        <View style={styles.metaRow}>
          <Text style={styles.year}>{movie.year}</Text>
          {firstGenreName && (
            <>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.genre}>{firstGenreName}</Text>
            </>
          )}
        </View>

        {/* Showtimes */}
        <View style={styles.showtimesRow}>
          {scheduleEntries.map((entry, index) => (
            <View
              key={`${movie.id}-${cinemaId}-${entry.purchase_url}-${index}`}
              style={styles.chip}
            >
              <Text style={styles.chipText}>{formatTime(entry.time)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Favourite button – still separate */}
      <Pressable style={styles.favouriteButton}>
        <Feather name="heart" size={18} color="#FF748B" />
      </Pressable>
    </Pressable>
  );
}
