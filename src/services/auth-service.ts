import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, RegisterData, User, UpdateProfileData } from '../redux/types';

// AsyncStorage Keys
const AUTH_TOKEN_KEY = '@dr_cinema_auth_token';
const USER_DATA_KEY = '@dr_cinema_user_data';
const USERS_DB_KEY = '@dr_cinema_users_db';

export class AuthService {
  /**
   * Generate a simple token (for local auth)
   */
  private generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all users from local storage
   */
  private async getUsersDB(): Promise<Record<string, User & { password: string }>> {
    try {
      const usersData = await AsyncStorage.getItem(USERS_DB_KEY);
      return usersData ? JSON.parse(usersData) : {};
    } catch (error) {
      console.error('Error loading users DB:', error);
      return {};
    }
  }

  /**
   * Save users to local storage
   */
  private async saveUsersDB(users: Record<string, User & { password: string }>): Promise<void> {
    try {
      await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users DB:', error);
      throw error;
    }
  }

  /**
   * Store auth data (token + user)
   */
  private async storeAuthData(token: string, user: User): Promise<void> {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }

  /**
   * Sign Up - Your existing method signature with profile image
   */
  async signUp(
    email: string,
    fullName: string,
    password: string,
    confirmPassword: string,
    profileImage?: string
  ): Promise<{ success: boolean; message: string; user?: User; token?: string }> {
    try {
      console.log('📝 Registering user:', email);

      // Validate inputs
      if (!email || !fullName || !password || !confirmPassword) {
        return {
          success: false,
          message: 'All fields are required',
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address',
        };
      }

      // Validate name length
      if (fullName.length < 2) {
        return {
          success: false,
          message: 'Name must be at least 2 characters',
        };
      }

      // Validate password length
      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters',
        };
      }

      // Check passwords match
      if (password !== confirmPassword) {
        return {
          success: false,
          message: 'Passwords do not match',
        };
      }

      // Get all users
      const users = await this.getUsersDB();

      // Check if email already exists
      const emailExists = Object.values(users).some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }

      // Create new user
      const userId = this.generateUserId();
      const newUser = {
        id: userId,
        email: email,
        name: fullName,
        password: password,
        profileImage: profileImage,
        bookingsCount: 0,
        createdAt: new Date().toISOString(),
      };

      // Save to users DB
      users[userId] = newUser;
      await this.saveUsersDB(users);

      // Create user object (without password)
      const user: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profileImage: newUser.profileImage,
        bookingsCount: newUser.bookingsCount,
        createdAt: newUser.createdAt,
      };

      // Generate token
      const token = this.generateToken();

      // Store token and user data
      await this.storeAuthData(token, user);

      console.log('✅ Registration successful');
      return {
        success: true,
        message: 'Account created successfully',
        user,
        token,
      };
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.',
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      console.log('🔐 Logging in user:', credentials.email);

      // Get all users
      const users = await this.getUsersDB();

      // Find user by email
      const userEntry = Object.values(users).find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      );

      // Check if user exists
      if (!userEntry) {
        throw new Error('User not found. Please register first.');
      }

      // Check password
      if (userEntry.password !== credentials.password) {
        throw new Error('Invalid password');
      }

      // Create user object (without password)
      const user: User = {
        id: userEntry.id,
        email: userEntry.email,
        name: userEntry.name,
        profileImage: userEntry.profileImage,
        bookingsCount: userEntry.bookingsCount || 0,
        createdAt: userEntry.createdAt,
      };

      // Generate token
      const token = this.generateToken();

      // Store token and user data
      await this.storeAuthData(token, user);

      console.log('✅ Login successful');
      return { user, token };
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      console.log('👋 Logging out user');
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      throw error;
    }
  }

  /**
   * Get stored auth token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('❌ Error getting token:', error);
      return null;
    }
  }

  /**
   * Get stored user data
   */
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('❌ Error getting user data:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: UpdateProfileData): Promise<User> {
    try {
      console.log('✏️ Updating profile for user:', userId);

      // Get all users
      const users = await this.getUsersDB();

      // Find user
      if (!users[userId]) {
        throw new Error('User not found');
      }

      // Update user data (keep password unchanged)
      users[userId] = {
        ...users[userId],
        ...updates,
      };

      // Save updated users DB
      await this.saveUsersDB(users);

      // Create updated user object (without password)
      const updatedUser: User = {
        id: users[userId].id,
        email: users[userId].email,
        name: users[userId].name,
        profileImage: users[userId].profileImage,
        bookingsCount: users[userId].bookingsCount,
        createdAt: users[userId].createdAt,
      };

      // Update stored user data
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

      console.log('✅ Profile updated');
      return updatedUser;
    } catch (error: any) {
      console.error('❌ Profile update error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const users = await this.getUsersDB();

      if (!users[userId]) {
        throw new Error('User not found');
      }

      // Verify current password
      if (users[userId].password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }

      // Validate new password
      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters');
      }

      // Update password
      users[userId].password = newPassword;
      await this.saveUsersDB(users);

      console.log('✅ Password changed successfully');
    } catch (error: any) {
      console.error('❌ Password change error:', error);
      throw error;
    }
  }

  /**
   * Delete account
   */
  async deleteAccount(userId: string): Promise<void> {
    try {
      console.log('🗑️ Deleting account:', userId);

      const users = await this.getUsersDB();

      if (!users[userId]) {
        throw new Error('User not found');
      }

      // Remove user from database
      delete users[userId];
      await this.saveUsersDB(users);

      // Clear stored auth data
      await this.logout();

      console.log('✅ Account deleted successfully');
    } catch (error: any) {
      console.error('❌ Account deletion error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();