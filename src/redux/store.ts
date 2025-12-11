import { configureStore } from "@reduxjs/toolkit";

// Import all the reducers
import moviesReducer from "./slices/movies-slice";
import favoritesReducer from "./slices/favorites-slice";
import cinemasReducer from "./slices/cinemas-slice";
import upcomingReducer from "./slices/upcomming-slice";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    cinemas: cinemasReducer,
    upcoming: upcomingReducer,
    auth: authReducer,
  },
});

// These types let TypeScript know the shape of the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;