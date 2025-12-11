import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Movie } from "@/src/redux/types";

const BASE_KEY = "@dr_cinema_favourites";

function getKeyForUser(userKey: string) {
  return `${BASE_KEY}_${userKey}`;
}

// Build a stable key from your user object
export function buildUserFavouritesKey(
  user: { id?: number | string; email?: string } | null
): string | null {
  if (!user) return null; // not logged in

  if (user.id !== undefined && user.id !== null) {
    return String(user.id);
  }

  if (user.email) {
    return user.email;
  }

  return null;
}

export async function getFavourites(userKey: string | null): Promise<Movie[]> {
  if (!userKey) return []; // not logged in => no favourites
  try {
    const storageKey = getKeyForUser(userKey);
    const json = await AsyncStorage.getItem(storageKey);
    return json ? (JSON.parse(json) as Movie[]) : [];
  } catch (e) {
    console.warn("Failed to load favourites", e);
    return [];
  }
}

export async function saveFavourites(userKey: string | null, favs: Movie[]) {
  if (!userKey) return; // not logged in => don't store
  try {
    const storageKey = getKeyForUser(userKey);
    await AsyncStorage.setItem(storageKey, JSON.stringify(favs));
  } catch (e) {
    console.warn("Failed to save favourites", e);
  }
}

export async function addFavourite(
  userKey: string | null,
  movie: Movie
): Promise<void> {
  if (!userKey) return; // not logged in
  const favs = await getFavourites(userKey);
  const exists = favs.some((m) => m.id === movie.id);
  if (!exists) {
    const updated = [...favs, movie];
    await saveFavourites(userKey, updated);
  }
}

export async function removeFavourite(
  userKey: string | null,
  movieId: number
): Promise<void> {
  if (!userKey) return;
  const favs = await getFavourites(userKey);
  const updated = favs.filter((m) => m.id !== movieId);
  await saveFavourites(userKey, updated);
}
