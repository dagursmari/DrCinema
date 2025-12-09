import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CinemasState, Cinema } from '../types';
import { apiService } from '../../services/api-service';

// ==========================================
// INITIAL STATE
// ==========================================
const initialState: CinemasState = {
  cinemas: [],
  loading: false,
  error: null,
};

// ==========================================
// ASYNC THUNKS (API Calls)
// ==========================================

/**
 * Fetch all cinemas from the API
 * Automatically sorts them alphabetically by name
 */
export const fetchCinemas = createAsyncThunk(
  'cinemas/fetchCinemas',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🎭 Fetching cinemas from API...');
      const cinemas = await apiService.getCinemas();
      
      // Sort alphabetically by name (required by assignment)
      const sortedCinemas = cinemas.sort((a, b) => 
        a.name.localeCompare(b.name, 'is-IS') // Icelandic locale for proper sorting
      );
      
      console.log(`✅ Fetched ${sortedCinemas.length} cinemas`);
      return sortedCinemas;
    } catch (error: any) {
      console.error('❌ Failed to fetch cinemas:', error);
      return rejectWithValue(error.message || 'Failed to fetch cinemas');
    }
  }
);

/**
 * Fetch a specific cinema by ID
 * (Optional - if you need detailed cinema info)
 */
export const fetchCinemaById = createAsyncThunk(
  'cinemas/fetchCinemaById',
  async (cinemaId: number, { rejectWithValue }) => {
    try {
      console.log(`🎭 Fetching cinema ${cinemaId}...`);
      const cinema = await apiService.getCinemaById(cinemaId);
      console.log(`✅ Fetched cinema: ${cinema.name}`);
      return cinema;
    } catch (error: any) {
      console.error(`❌ Failed to fetch cinema ${cinemaId}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch cinema');
    }
  }
);

// ==========================================
// SLICE
// ==========================================
const cinemasSlice = createSlice({
  name: 'cinemas',
  initialState,
  
  // Synchronous reducers (for manual state updates)
  reducers: {
    /**
     * Clear any error message
     */
    clearCinemasError: (state) => {
      state.error = null;
    },

    /**
     * Manually sort cinemas (if needed)
     */
    sortCinemas: (state, action: PayloadAction<'asc' | 'desc'>) => {
      const order = action.payload;
      state.cinemas.sort((a, b) => {
        if (order === 'asc') {
          return a.name.localeCompare(b.name, 'is-IS');
        } else {
          return b.name.localeCompare(a.name, 'is-IS');
        }
      });
    },

    /**
     * Reset cinemas state to initial
     */
    resetCinemas: (state) => {
      state.cinemas = [];
      state.loading = false;
      state.error = null;
    },
  },
  
  // Async action handlers (for thunks)
  extraReducers: (builder) => {
    // ==========================================
    // FETCH ALL CINEMAS
    // ==========================================
    builder
      .addCase(fetchCinemas.pending, (state) => {
        console.log('⏳ Loading cinemas...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action: PayloadAction<Cinema[]>) => {
        console.log('✅ Cinemas loaded successfully');
        state.loading = false;
        state.cinemas = action.payload;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        console.log('❌ Failed to load cinemas');
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // ==========================================
    // FETCH CINEMA BY ID
    // ==========================================
      .addCase(fetchCinemaById.pending, (state) => {
        console.log('⏳ Loading cinema details...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemaById.fulfilled, (state, action: PayloadAction<Cinema>) => {
        console.log('✅ Cinema details loaded');
        state.loading = false;
        
        // Update cinema in the list if it exists, otherwise add it
        const index = state.cinemas.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.cinemas[index] = action.payload;
        } else {
          state.cinemas.push(action.payload);
          // Re-sort after adding
          state.cinemas.sort((a, b) => a.name.localeCompare(b.name, 'is-IS'));
        }
      })
      .addCase(fetchCinemaById.rejected, (state, action) => {
        console.log('❌ Failed to load cinema details');
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ==========================================
// EXPORTS
// ==========================================
export const { clearCinemasError, sortCinemas, resetCinemas } = cinemasSlice.actions;
export default cinemasSlice.reducer;