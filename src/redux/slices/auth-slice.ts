import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterData, User, UpdateProfileData } from '../types';
import { authService } from '../../services/auth-service';

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async Thunks

/**
 * Login user
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Register user
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

/**
 * Logout user
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

/**
 * Load stored auth data on app start
 */
export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      const token = await authService.getToken();
      const user = await authService.getUserData();

      if (token && user) {
        return { token, user };
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load auth data');
    }
  }
);

/**
 * Update user profile
 */
export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updates: UpdateProfileData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;

      if (!user) {
        throw new Error('No authenticated user');
      }

      const updatedUser = await authService.updateProfile(user.id, updates);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })

    // LOAD STORED AUTH
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })

    // UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;