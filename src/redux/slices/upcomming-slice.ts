import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UpcomingState, UpcomingMovie } from "../types";
import { apiService } from "../../services/api-service";

//initial storage
const initialState: UpcomingState = {
  upcomingMovies: [],  // No upcoming movies yet
  loading: false,      // Not loading
  error: null,         // No errors
};

//Remove duplicate movies by ID
const deduplicateMovies = (movies: UpcomingMovie[]): UpcomingMovie[] => {
  const uniqueMap = new Map<number, UpcomingMovie>();
  
  movies.forEach(movie => {
    // Only keep the first occurrence of each movie ID
    if (!uniqueMap.has(movie.id)) {
      uniqueMap.set(movie.id, movie);
    }
  });
  
  return Array.from(uniqueMap.values());
};


//Fetch upcomming movies from the API
//Sort by release date (soonest first)
export const fetchUpcomingMovies = createAsyncThunk(
  "upcoming/fetchUpcomingMovies",  // Unique name for this action
  async (_, { rejectWithValue }) => {
    try {
      console.log("📅 Fetching upcoming movies from API...");
      
      // Call the API
      const upcomingMovies = await apiService.getUpcomingMovies();
      
      // Deduplicate movies (in case API returns duplicates)
      const uniqueMovies = deduplicateMovies(upcomingMovies);

      // Sort by release date (soonest first) 
      const sortedMovies = uniqueMovies.sort((a, b) => {
        const dateA = new Date(a["release-dateIS"]).getTime();
        const dateB = new Date(b["release-dateIS"]).getTime();
        return dateA - dateB; // Ascending order (soonest first)
      });
      
      console.log(`Fetched ${sortedMovies.length} upcoming movies`);
      
      // Return the sorted movies (will be sent to the reducer)
      return sortedMovies;
      
    } catch (error: any) {
      console.error("Failed to fetch upcoming movies:", error);
      // If something goes wrong, send error back
      return rejectWithValue(error.message || "Failed to fetch upcoming movies");
    }
  }
);


//Upcomming slice
const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  
  // Synchronous reducers (instant updates)
  reducers: {
    clearUpcomingError: (state) => {
      state.error = null;
    },

    /**
     * Manually sort upcoming movies
     * Usage: dispatch(sortUpcomingMovies('asc' or 'desc'))
     */
    sortUpcomingMovies: (state, action: PayloadAction<'asc' | 'desc'>) => {
      const order = action.payload;
      state.upcomingMovies.sort((a, b) => {
        const dateA = new Date(a["release-dateIS"]).getTime();
        const dateB = new Date(b["release-dateIS"]).getTime();
        
        if (order === 'asc') {
          return dateA - dateB; // Soonest first
        } else {
          return dateB - dateA; // Latest first
        }
      });
    },

    /**
     * Filter upcoming movies by release date range
     * Usage: dispatch(filterByDateRange({ start: '2025-01-01', end: '2025-12-31' }))
     */
    filterByDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      const { start, end } = action.payload;
      const startDate = new Date(start).getTime();
      const endDate = new Date(end).getTime();
      
      state.upcomingMovies = state.upcomingMovies.filter(movie => {
        const releaseDate = new Date(movie["release-dateIS"]).getTime();
        return releaseDate >= startDate && releaseDate <= endDate;
      });
    },

    /**
     * Reset upcoming movies state to initial
     */
    resetUpcoming: (state) => {
      state.upcomingMovies = [];
      state.loading = false;
      state.error = null;
    },
  },
  
  // Async action handlers (for thunks)
  extraReducers: (builder) => {
    // FETCH ALL UPCOMING MOVIES
    builder
      // Stage 1: Pending
      .addCase(fetchUpcomingMovies.pending, (state) => {
        console.log("Loading upcoming movies...");
        state.loading = true;   // Show loading spinner
        state.error = null;     // Clear any old errors
      })
      
      // Stage 2: Fulfilled
      .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<UpcomingMovie[]>) => {
        console.log("Upcoming movies loaded successfully");
        state.loading = false;              // Stop showing spinner
        state.upcomingMovies = action.payload; // Save the movies!
      })
      
      // Stage 3: Rejected
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        console.log("Failed to load upcoming movies");
        state.loading = false;                 // Stop showing spinner
        state.error = action.payload as string; // Save error message
      })
      
  }
});

// EXPORTS
export const { 
  clearUpcomingError, 
  sortUpcomingMovies, 
  filterByDateRange,
  resetUpcoming 
} = upcomingSlice.actions;

export default upcomingSlice.reducer;