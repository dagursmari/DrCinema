import AsyncStorage from "@react-native-async-storage/async-storage";
import { encode as btoa } from "base-64";

const apiBaseUrl = "https://api.kvikmyndir.is";
const tokenKey = "@dr_cinema_token";
const tokenExpiryKey = "@dr_cinema_token_expiry";

// REPLACE WITH YOUR CREDENTIALS AFTER YOU HAVE REGISTERED
const username = "dagursmari";
const password = "dagursmari";

class ApiClient {
  private token: string | null = null;

  async getToken(): Promise<string> {
    //check if there is a cashed token
    if (this.token) {

      return this.token;
    }

    const storedToken = await AsyncStorage.getItem(tokenKey);
    const expiryTime = await AsyncStorage.getItem(tokenExpiryKey);

    //Check if token has expired
    if (storedToken && expiryTime) {
      const now = Date.now();
      if (now < parseInt(expiryTime, 10)) {
        this.token = storedToken;

        return storedToken;
      } else {
      }
    }

    return await this.authenticate();
  }

  private async authenticate(): Promise<string> {

   try {
      // Create Basic Auth header (same as Postman does)
      const credentials = `${username}:${password}`;
      const base64Credentials = btoa(credentials);
      const authHeader = `Basic ${base64Credentials}`;


      //Send a post request to API to getu auth key
      const response = await fetch(`${apiBaseUrl}/authenticate`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
        },
      });
      //responce from API

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.token) {
        throw new Error(data.message || "No token received");
      }

    //Store new token in cache
      this.token = data.token;
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000); //Runs out in 24h

      //Store in AsyncStorage
      await AsyncStorage.setItem(tokenKey, data.token);
      await AsyncStorage.setItem(tokenExpiryKey, expiryTime.toString());

      //return new token if authentication successful
      return data.token;

    } catch (error) {
      throw error;
    }
  }

    //API get function
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> {
    const token = await this.getToken();

    let url = `${apiBaseUrl}${endpoint}`;
    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      url += `?${params.toString()}`;
    }


    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });


    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        this.token = null;
        await AsyncStorage.removeItem(tokenKey);
        await AsyncStorage.removeItem(tokenExpiryKey);

        const newToken = await this.getToken();
        const retryResponse = await fetch(url, {
          method: "GET",
          headers: {
            "x-access-token": newToken,
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
    await AsyncStorage.removeItem(tokenKey);
    await AsyncStorage.removeItem(tokenExpiryKey);
  }
}

export const apiClient = new ApiClient();