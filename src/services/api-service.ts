import { Cinema, Genre, Movie, UpcomingMovie } from "../redux/types";
import { apiClient } from "./api";

export const apiService = {
  // Fetch all movies currently playing
  async getMovies(): Promise<Movie[]> {
    console.log("Fetching movies...");

    return await apiClient.get<Movie[]>("/movies");
  },

  //Fetch all cinemas (theaters)
  async getCinemas(): Promise<Cinema[]> {

    return await apiClient.get<Cinema[]>("/theaters");
  },

    //Fetch a specific cinema by ID
    //Note: The API doesn't have a /theaters/:id endpoint,
    //so we fetch all and filter
  async getCinemaById(id: number): Promise<Cinema> {
    console.log(`Fetching cinema ${id}...`);
    const cinemas = await apiClient.get<Cinema[]>("/theaters");
    const cinema = cinemas.find(c => c.id === id);

    if (!cinema) {
      throw new Error(`Cinema with id ${id} not found`);
    }

    return cinema;
  },

  //Fetch upcoming movies
  async getUpcomingMovies(): Promise<UpcomingMovie[]> {

    return await apiClient.get<UpcomingMovie[]>("/upcoming");
  },

  // Fetch all genres
  async getGenres(): Promise<Genre[]> {

    return await apiClient.get<Genre[]>("/genres");
  },
};