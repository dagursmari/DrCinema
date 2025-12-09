import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState, Movie } from '../types';
import { apiService } from '../../services/api-service';

// ==========================================
// INITIAL STATE - What does this shelf start with?
// ==========================================
const initialState: MoviesState = {
  movies: [],        // No movies yet
  loading: false,    // Not loading
  error: null,       // No errors
};

// ==========================================
// ASYNC THUNK - The delivery order!
// ==========================================
/**
 * This is an "async action" - it goes out, fetches data,
 * and comes back to update the store
 */
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',           // Unique name for this action
  async (_, { rejectWithValue }) => {
    try {
      // Call the API
      const movies = await apiService.getMovies();
      // Return the movies (will be sent to the reducer)
      return movies;
    } catch (error: any) {
      // If something goes wrong, send error back
      return rejectWithValue(error.message);
    }
  }
);

// ==========================================
// SLICE - The warehouse worker
// ==========================================
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  
  // Synchronous actions (instant updates)
  reducers: {
    clearMoviesError: (state) => {
      state.error = null;
    },
  },
  
  // Async action handlers (for fetchMovies)
  extraReducers: (builder) => {
    builder
      // When fetchMovies STARTS
      .addCase(fetchMovies.pending, (state) => {
        console.log('⏳ Loading movies...');
        state.loading = true;
        state.error = null;
      })
      
      // When fetchMovies SUCCEEDS
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        console.log('✅ Movies loaded successfully!');
        state.loading = false;
        state.movies = action.payload;  // Save the movies
      })
      
      // When fetchMovies FAILS
      .addCase(fetchMovies.rejected, (state, action) => {
        console.log('❌ Failed to load movies');
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions and reducer
export const { clearMoviesError } = moviesSlice.actions;
export default moviesSlice.reducer;