import type { UpcomingMovie } from "@/src/redux/types";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { UpcomingCard } from "../upcoming-card/upcoming-card";
import styles from "./styles";

interface UpcomingListProps {
  movies: UpcomingMovie[];
}

export function UpcomingList({ movies }: UpcomingListProps) {
  if (movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎬</Text>
        <Text style={styles.emptyText}>No upcoming movies</Text>
        <Text style={styles.emptySubtext}>Check back later for new releases</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UpcomingCard movie={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}