import { useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";

import CinemaListItem from "@/src/components/cinema-list-item/CinemaListItem";
import { normalizeInitial } from "@/src/components/letter-helper/letters";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchCinemas } from "@/src/redux/slices/cinemas-slice";

import type { Cinema } from "@/src/redux/types";
import styles from "./styles";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";

interface CinemaSection {
  title: string;
  data: Cinema[];
}

export function CinemasScreenView() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { cinemas, loading, error } = useAppSelector((state) => state.cinemas);

  useEffect(() => {
    if (!cinemas || cinemas.length === 0) {
      dispatch(fetchCinemas());
    }
  }, [dispatch, cinemas.length]);

  const sections: CinemaSection[] = useMemo(() => {
    const groups: Record<string, Cinema[]> = {};

    cinemas.forEach((cinema) => {
      const firstChar = normalizeInitial(cinema.name?.charAt(0).toUpperCase()) || "#";
      const key = firstChar;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(cinema);
    });

    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        title: letter,
        data: groups[letter],
      }));
  }, [cinemas]);

  const handlePressCinema = (cinema: Cinema) => {
    router.push({
      pathname: "/cinema-details",
      params: { id: cinema.id.toString() },
    });
  };

  return (
    <ScreenWithFooter>
      <View style={styles.container}>
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#e50914" />
            <Text style={styles.loadingText}>Loading cinemas...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>❌ {error}</Text>
          </View>
        )}

        {!loading && !error && (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({ item }) => (
              <CinemaListItem cinema={item} onPress={() => handlePressCinema(item)} />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </ScreenWithFooter>
  );
}
