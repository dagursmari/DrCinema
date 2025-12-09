import { apiClient } from './api';
import { Movie, Cinema, UpcomingMovie, Genre } from '../redux/types';

/**
 * This is like a menu of all the API calls we can make
 */
export const apiService = {
  /**
   * Get all movies currently playing
   */
  async getMovies(): Promise<Movie[]> {
    console.log('🎬 Fetching movies...');
    return await apiClient.get<Movie[]>('/movies');
  },

  /**
   * Get all cinemas (theaters)
   */
  async getCinemas(): Promise<Cinema[]> {
    console.log('🎭 Fetching cinemas...');
    return await apiClient.get<Cinema[]>('/theaters');
  },

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(): Promise<UpcomingMovie[]> {
    console.log('📅 Fetching upcoming movies...');
    return await apiClient.get<UpcomingMovie[]>('/upcoming');
  },

  /**
   * Get all genres
   */
  async getGenres(): Promise<Genre[]> {
    console.log('🎨 Fetching genres...');
    return await apiClient.get<Genre[]>('/genres');
  },
};