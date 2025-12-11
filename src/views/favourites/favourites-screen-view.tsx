import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import DraggableFlatList from "react-native-draggable-flatlist";

import { ScreenWithFooter } from "../footer/ScreenWithFooter";
import FavouriteItem from "@/src/components/favourite-item/FavouriteItem";

import { useAppSelector } from "@/src/redux/hooks";

import {
  getFavourites,
  saveFavourites,
  removeFavourite,
  buildUserFavouritesKey,
} from "@/src/services/favourites-storage";

import type { Movie } from "@/src/redux/types";
import styles from "./styles";
import { isAction } from "@reduxjs/toolkit";

export function FavouritesScreenView() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user); // logged in?
  const isLoggedIn = !!user;

  const userKey = buildUserFavouritesKey(user);

  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !userKey) {
      setFavourites([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      const favs = await getFavourites(userKey);
      setFavourites(favs);
      setLoading(false);
    };

    load();
  }, [isLoggedIn, userKey]);

  const handleRemove = async (id: number) => {
    if (!isLoggedIn || !userKey) return;

    await removeFavourite(userKey, id);

    const updated = favourites.filter((m) => m.id !== id);
    setFavourites(updated);
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
        {/* Page title */}
        <Text style={styles.title}>Favourites</Text>

        {/* NOT LOGGED IN */}
        {!isLoggedIn ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              You must be logged in to save favourites.
            </Text>
          </View>
        ) : loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#e50914" />
          </View>
        ) : favourites.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>You have no favourite movies yet.</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            onDragEnd={({ data }) => {
              setFavourites(data);
              saveFavourites(userKey, data);
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
