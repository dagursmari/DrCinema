import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import DraggableFlatList from "react-native-draggable-flatlist";

import { ScreenWithFooter } from "../footer/ScreenWithFooter";
import FavouriteItem from "@/src/components/favourite-item/FavouriteItem";
import {
  getFavourites,
  saveFavourites,
  removeFavourite,
} from "@/src/services/favourites-storage";

import type { Movie } from "@/src/redux/types";
import styles from "./styles";

export function FavouritesScreenView() {
  const router = useRouter();
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await getFavourites();
    setFavourites(data);
    setLoading(false);
  };

  const handleRemove = async (id: number) => {
    await removeFavourite(id);
    load();
  };

  const goToMovie = (movie: Movie) => {
    router.push({
      pathname: "/movie-screen",
      params: { id: movie.id.toString() },
    });
  };

  return (
    <ScreenWithFooter>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#e50914" />
        ) : favourites.length === 0 ? (
          <Text style={styles.emptyText}>No favourites yet</Text>
        ) : (
          <DraggableFlatList
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={({ data }) => {
              setFavourites(data);
              saveFavourites(data);
            }}
            renderItem={({ item, drag, isActive }) => (
              <FavouriteItem
                movie={item}
                isActive={isActive}
                onLongPress={drag}
                onPress={() => goToMovie(item)}
                onRemove={() => handleRemove(item.id)}
              />
            )}
          />
        )}
      </View>
    </ScreenWithFooter>
  );
}
