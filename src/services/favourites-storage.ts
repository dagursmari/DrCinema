import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Movie } from "@/src/redux/types";

const KEY = "@dr_cinema_favourites";

export async function getFavourites(): Promise<Movie[]> {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.warn("Failed to load favourites", e);
    return [];
  }
}

export async function saveFavourites(favs: Movie[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(favs));
  } catch (e) {
    console.warn("Failed to save favourites", e);
  }
}

export async function addFavourite(movie: Movie) {
  const favs = await getFavourites();
  const exists = favs.some((m) => m.id === movie.id);
  if (!exists) {
    favs.push(movie);
    await saveFavourites(favs);
  }
}

export async function removeFavourite(movieId: number) {
  const favs = await getFavourites();
  const updated = favs.filter((m) => m.id !== movieId);
  await saveFavourites(updated);
}
