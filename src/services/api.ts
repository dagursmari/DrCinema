import AsyncStorage from "@react-native-async-storage/async-storage";
import { encode as btoa } from "base-64";

const API_BASE_URL = "https://api.kvikmyndir.is";
const TOKEN_KEY = "@dr_cinema_token";
const TOKEN_EXPIRY_KEY = "@dr_cinema_token_expiry";

// REPLACE WITH YOUR CREDENTIALS AFTER YOU HAVE REGISTERED
const USERNAME = "dagursmari";
const PASSWORD = "dagursmari";

class ApiClient {
  private token: string | null = null;

  async getToken(): Promise<string> {
    //check if there is a cashed token
    if (this.token) {
      console.log("Using cached token");
      return this.token;
    }

    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    const expiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);

    //Check if token has expired
    if (storedToken && expiryTime) {
      const now = Date.now();
      if (now < parseInt(expiryTime, 10)) {
        console.log("Using stored token");
        this.token = storedToken;
        return storedToken;
      } else {
        console.log("Stored token expired");
      }
    }

    console.log("Getting new token...");
    return await this.authenticate();
  }

  private async authenticate(): Promise<string> {
    console.log("Authenticating with Basic Auth...");
    console.log("Username: ", USERNAME);
    
    try {
      // Create Basic Auth header (same as Postman does)
      const credentials = `${USERNAME}:${PASSWORD}`;
      const base64Credentials = btoa(credentials);
      const authHeader = `Basic ${base64Credentials}`;
      
      console.log("Auth header:", `Basic ${base64Credentials.substring(0, 20)}...`);
      
      const response = await fetch(`${API_BASE_URL}/authenticate`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
        },
      });
      //responce from API
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Auth failed: ", errorText);
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      
      if (!data.success || !data.token) {
        console.error("No token received:", data.message);
        throw new Error(data.message || "No token received");
      }

      this.token = data.token;
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

      console.log("Authentication successful!");
      console.log("Token (first 30 chars):", data.token.substring(0, 30) + "...");
      
      //return new token if authentication successful
      return data.token;

    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }

    //API get function
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> {
    const token = await this.getToken();
    
    let url = `${API_BASE_URL}${endpoint}`;
    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      url += `?${params.toString()}`;
    }
    
    console.log(`GET: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'x-access-token': token,
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.log('🔄 Token expired, re-authenticating...');
        this.token = null;
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(TOKEN_EXPIRY_KEY);
        
        const newToken = await this.getToken();
        const retryResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'x-access-token': newToken,
          },
        });
        
        if (!retryResponse.ok) {
          const errorText = await retryResponse.text();
          throw new Error(`API Error: ${retryResponse.status} ${errorText}`);
        }
        
        return await retryResponse.json();
      }
      
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  }

  async clearToken(): Promise<void> {
    this.token = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(TOKEN_EXPIRY_KEY);
    console.log('🗑️ Token cleared');
  }
}

export const apiClient = new ApiClient();