import type { Movie } from "@/src/redux/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseKey = "@dr_cinema_favourites";

function GetKeyForUser(userKey: string) {
  return `${baseKey}_${userKey}`;
}

// Build a stable key from your user object
export function BuildUserFavouritesKey(
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

export async function GetFavourites(userKey: string | null): Promise<Movie[]> {
  if (!userKey) return []; // not logged in => no favourites
  try {
    const storageKey = GetKeyForUser(userKey);
    const json = await AsyncStorage.getItem(storageKey);

    return json ? (JSON.parse(json) as Movie[]) : [];
  } catch (e) {

    return [];
  }
}

export async function SaveFavourites(userKey: string | null, favs: Movie[]) {
  if (!userKey) return; // not logged in => don't store
  try {
    const storageKey = GetKeyForUser(userKey);
    await AsyncStorage.setItem(storageKey, JSON.stringify(favs));
  } catch (e) {
  }
}

export async function AddFavourite(
  userKey: string | null,
  movie: Movie
): Promise<void> {
  if (!userKey) return; // not logged in
  const favs = await GetFavourites(userKey);
  const exists = favs.some((m) => m.id === movie.id);
  if (!exists) {
    const updated = [...favs, movie];
    await SaveFavourites(userKey, updated);
  }
}

export async function RemoveFavourite(
  userKey: string | null,
  movieId: number
): Promise<void> {
  if (!userKey) return;
  const favs = await GetFavourites(userKey);
  const updated = favs.filter((m) => m.id !== movieId);
  await SaveFavourites(userKey, updated);
}
