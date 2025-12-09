import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://api.kvikmyndir.is";
const TOKEN_KEY = "@dr_cinema_token";
const TOKEN_EXPIRY_KEY = "@dr_cinema_token_expiry";

// Replace with YOUR credentials from registration
const USERNAME = "dagursmari";
const PASSWORD = "dagursmari";

/**
 * ApiClient handles authentication and making requests
 * Think of this as your "pass" to access the API
 */
class ApiClient {
  private token: string | null = null;

  /**
   * Get a valid token (from memory, storage, or by logging in)
   */
  async getToken(): Promise<string> {
    // 1. Do we already have a token in memory?
    if (this.token) {
      return this.token;
    }

    // 2. Check if we saved a token previously
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    const expiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);

    if (storedToken && expiryTime) {
      const now = Date.now();
      // Is it still valid?
      if (now < parseInt(expiryTime, 10)) {
        this.token = storedToken;
        return storedToken;
      }
    }

    // 3. Token is expired or doesn't exist - get a new one
    return await this.authenticate();
  }

  /**
   * Log in to the API and get a fresh token
   */
  private async authenticate(): Promise<string> {
    console.log('🔐 Authenticating with API...');
    
    const response = await fetch(`${API_BASE_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed - check your credentials');
    }

    const data = await response.json();
    
    if (!data.success || !data.token) {
      throw new Error('Authentication failed - no token received');
    }

    this.token = data.token;

    // Save token and expiry time (24 hours from now)
    const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
    await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

    console.log('✅ Authentication successful!');
    return data.token;
  }

  /**
   * Make a GET request to the API with authentication
   */
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> {
    const token = await this.getToken();
    
    // Build URL with optional query parameters
    let url = `${API_BASE_URL}${endpoint}`;
    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      url += `?${params.toString()}`;
    }
    
    console.log(`📡 Fetching: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': token,  // Include token in header
      },
    });

    if (!response.ok) {
      // If token expired (401/403), try to re-authenticate once
      if (response.status === 401 || response.status === 403) {
        console.log('🔄 Token expired, re-authenticating...');
        this.token = null;
        await AsyncStorage.removeItem(TOKEN_KEY);
        
        // Retry with fresh token
        const newToken = await this.getToken();
        const retryResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'x-access-token': newToken,
          },
        });
        
        if (!retryResponse.ok) {
          throw new Error(`API Error: ${retryResponse.status}`);
        }
        
        return await retryResponse.json();
      }
      
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Clear the token (for logout)
   */
  async clearToken(): Promise<void> {
    this.token = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(TOKEN_EXPIRY_KEY);
  }
}

// Export a single instance to use throughout the app
export const apiClient = new ApiClient();