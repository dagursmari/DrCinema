import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@dr_cinema_users';
const CURRENT_USER_KEY = '@dr_cinema_current_user';

export interface User {
    id: string;
    email: string;
    fullName: string;
    password: string;
    createdAt: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: Omit<User, 'password'>;
}

export class AuthService {
    // Get all users from storage
    private static async getUsers(): Promise<User[]> {
        try {
            const usersJson = await AsyncStorage.getItem(USERS_KEY);
            return usersJson ? JSON.parse(usersJson) : [];
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // Save users to storage
    private static async saveUsers(users: User[]): Promise<void> {
        try {
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Error saving users:', error);
            throw new Error('Failed to save user data');
        }
    }

    // Check if email already exists
    private static async emailExists(email: string): Promise<boolean> {
        const users = await this.getUsers();
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Validate email format
    private static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Sign up new user
    static async signUp(
        email: string,
        fullName: string,
        password: string,
        confirmPassword: string
    ): Promise<AuthResponse> {
        // Validation
        if (!email || !fullName || !password || !confirmPassword) {
            return {
                success: false,
                message: 'All fields are required',
            };
        }

        if (!this.isValidEmail(email)) {
            return {
                success: false,
                message: 'Please enter a valid email address',
            };
        }

        if (fullName.length < 2) {
            return {
                success: false,
                message: 'Full name must be at least 2 characters',
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                message: 'Password must be at least 6 characters',
            };
        }

        if (password !== confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match',
            };
        }

        // Check if email already exists
        if (await this.emailExists(email)) {
            return {
                success: false,
                message: 'An account with this email already exists',
            };
        }

        // Create new user
        const newUser: User = {
            id: Date.now().toString(),
            email: email.toLowerCase(),
            fullName,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
        };

        try {
            const users = await this.getUsers();
            users.push(newUser);
            await this.saveUsers(users);

            // Set as current user
            await this.setCurrentUser(newUser);

            // Return user without password
            const { password: _, ...userWithoutPassword } = newUser;

            return {
                success: true,
                message: 'Account created successfully',
                user: userWithoutPassword,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to create account. Please try again.',
            };
        }
    }

    // Set current logged in user
    private static async setCurrentUser(user: User): Promise<void> {
        const { password: _, ...userWithoutPassword } = user;
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    }

    // Get current logged in user
    static async getCurrentUser(): Promise<Omit<User, 'password'> | null> {
        try {
            const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Log out current user
    static async logout(): Promise<void> {
        try {
            await AsyncStorage.removeItem(CURRENT_USER_KEY);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    // Check if user is logged in
    static async isLoggedIn(): Promise<boolean> {
        const user = await this.getCurrentUser();
        return user !== null;
    }
}