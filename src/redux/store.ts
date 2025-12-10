import { configureStore } from "@reduxjs/toolkit";

// Import all the reducers
import moviesReducer from "./slices/movies-slice";
import favoritesReducer from "./slices/favorites-slice";
import cinemasReducer from "./slices/cinemas-slice"
import upcomingReducer from "./slices/upcomming-slice"
// TODO: Import upcomingReducer, genresReducer

//This is the STORE - the main warehouse
//It combines all the slices into one place

export const store = configureStore({
  reducer: {
    movies: moviesReducer,       // Movies shelf
    favorites: favoritesReducer, // Favorites shelf
    cinemas: cinemasReducer,
    upcoming: upcomingReducer,
    // TODO: Add other reducers here
    // upcoming: upcomingReducer,
    // genres: genresReducer,
  },
});

// These types let TypeScript know the shape of the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;