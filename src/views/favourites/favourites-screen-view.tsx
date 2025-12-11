import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import FavouriteItem from "@/src/components/favourite-item/FavouriteItem";

import { useAppSelector } from "@/src/redux/hooks";
import { mainPink } from "@/src/styles/colors";

import {
  BuildUserFavouritesKey,
  GetFavourites,
  RemoveFavourite,
  SaveFavourites,
} from "@/src/services/favourites-storage";

import type { Movie } from "@/src/redux/types";
import styles from "./styles";
import { ScreenWithFooter } from "../footer/ScreenWithFooter";

export function FavouritesScreenView() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  const userKey = BuildUserFavouritesKey(user);

  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !userKey) {
      setFavourites([]);
      setLoading(false);

      return;
    }

    const load = async () => {
      const favs = await GetFavourites(userKey);
      setFavourites(favs);
      setLoading(false);
    };

    load();
  }, [isLoggedIn, userKey]);

  const handleRemove = async (id: number) => {
    if (!isLoggedIn || !userKey) return;

    await RemoveFavourite(userKey, id);

    const updated = favourites.filter((m) => m.id !== id);
    setFavourites(updated);
  };

  const goToMovie = (movie: Movie) => {
    router.push({
      pathname: "/movie-screen",
      params: { id: movie.id.toString() },
    });
  };
  const handleLogin = () => {
        router.push("/login");
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
            <TouchableOpacity
            onPress={handleLogin}>
              <Text style={{ color:mainPink }}>Press to Log In</Text>
            </TouchableOpacity>
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
              SaveFavourites(userKey, data);
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
