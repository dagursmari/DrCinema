import { configureStore } from '@reduxjs/toolkit';

// Import all the reducers (warehouse workers)
import moviesReducer from './slices/movies-slice';
//import favoritesReducer from './slices/favorites-slice';
// TODO: Import cinemasReducer, upcomingReducer, genresReducer when you create them

/**
 * This is the STORE - the main warehouse
 * It combines all the slices into one place
 */
export const store = configureStore({
  reducer: {
    movies: moviesReducer,       // Movies shelf
    //favorites: favoritesReducer, // Favorites shelf
    // TODO: Add other reducers here
    // cinemas: cinemasReducer,
    // upcoming: upcomingReducer,
    // genres: genresReducer,
  },
});

// ==========================================
// TypeScript Magic
// ==========================================
// These types let TypeScript know the shape of your store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;