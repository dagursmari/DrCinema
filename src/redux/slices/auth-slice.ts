import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../../services/auth-service";
import { AuthState, LoginCredentials, RegisterData, UpdateProfileData, User } from "../types";

// ==========================================
// CONSTANTS & HELPERS
// ==========================================
const userDataKey = "@dr_cinema_user_data";

/**
 * Helper to save user data to AsyncStorage
 */
const saveUserToStorage = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(userDataKey, JSON.stringify(user));
  } catch (error) {
  }
};

// ==========================================
// INITIAL STATE
// ==========================================
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ==========================================
// ASYNC THUNKS
// ==========================================

/**
 * Login user
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

/**
 * Register user
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const data = await authService.signUp(
        userData.email,
        userData.name,
        userData.password,
        userData.confirmPassword || userData.password,
        userData.profileImage
      );

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return { user: data.user!, token: data.token! };
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

/**
 * Logout user
 */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

/**
 * Load stored auth data on app start
 */
export const loadStoredAuth = createAsyncThunk(
  "auth/loadStored",
  async (_, { rejectWithValue }) => {
    try {
      const token = await authService.getToken();
      const user = await authService.getUserData();

      if (token && user) {

        return { token, user };
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load auth data");
    }
  }
);

/**
 * Update user profile
 */
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updates: UpdateProfileData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;

      if (!user) {
        throw new Error("No authenticated user");
      }

      const updatedUser = await authService.updateProfile(user.id, updates);

      return updatedUser;
    } catch (error: any) {

      return rejectWithValue(error.message || "Profile update failed");
    }
  }
);

/**
 * Change password
 */
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;

      if (!user) {
        throw new Error("No authenticated user");
      }

      await authService.changePassword(user.id, currentPassword, newPassword);
    } catch (error: any) {
      return rejectWithValue(error.message || "Password change failed");
    }
  }
);

/**
 * Delete account
 */
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;

      if (!user) {
        throw new Error("No authenticated user");
      }

      await authService.deleteAccount(user.id);
    } catch (error: any) {
      return rejectWithValue(error.message || "Account deletion failed");
    }
  }
);

// ==========================================
// AUTH SLICE
// ==========================================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Clear auth error
     */
    clearAuthError: (state) => {
      state.error = null;
    },

    /**
     * Set user manually (if needed)
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    /**
     * Clear all auth state (for testing/debugging)
     */
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    /**
     * Increment bookings counter
     */
    incrementBookings: (state) => {
      if (state.user) {
        state.user.bookingsCount = (state.user.bookingsCount || 0) + 1;
        // Save updated user to AsyncStorage (fire and forget)
        saveUserToStorage(state.user);
      }
    },
  },
  extraReducers: (builder) => {
    // ==========================================
    // LOGIN
    // ==========================================
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

    // ==========================================
    // REGISTER
    // ==========================================
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

    // ==========================================
    // LOGOUT
    // ==========================================
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even if logout fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

    // ==========================================
    // LOAD STORED AUTH
    // ==========================================
      .addCase(loadStoredAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.loading = false;
      })

    // ==========================================
    // UPDATE PROFILE
    // ==========================================
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
      })

    // ==========================================
    // CHANGE PASSWORD
    // ==========================================
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // ==========================================
    // DELETE ACCOUNT
    // ==========================================
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ==========================================
// EXPORTS
// ==========================================
export const { clearAuthError, setUser, clearAuthState, incrementBookings } = authSlice.actions;
export default authSlice.reducer;