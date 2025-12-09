import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState, Movie } from '../types';

const FAVORITES_KEY = '@dr_cinema_favorites';

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
};

/**
 * Load favorites from phone storage when app starts
 */
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        return JSON.parse(stored) as Movie[];
      }
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Helper function to save favorites to phone storage
 */
const saveFavorites = async (favorites: Movie[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Add a movie to favorites
     */
    addFavorite: (state, action: PayloadAction<Movie>) => {
      // Don't add if already exists
      const exists = state.favorites.find(m => m.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites);  // Save to phone
      }
    },

    /**
     * Remove a movie from favorites
     */
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(m => m.id !== action.payload);
      saveFavorites(state.favorites);  // Save to phone
    },

    /**
     * Reorder favorites (drag and drop)
     */
    reorderFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.favorites = action.payload;
      saveFavorites(state.favorites);  // Save to phone
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(loadFavorites.rejected, (state) => {
        state.loading = false;
        state.favorites = [];
      });
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;