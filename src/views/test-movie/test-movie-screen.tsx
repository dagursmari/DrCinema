import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { fetchMovies } from '@/src/redux/slices/movies-slice';
import type { Movie, Showtime } from '@/src/redux/types';

/**
 * Test screen to display movies with their showtimes
 */
export function TestMoviesScreen() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);

  useEffect(() => {
    console.log('🎬 TestMoviesScreen mounted - fetching movies...');
    dispatch(fetchMovies());
  }, [dispatch]);

  // Loading state
  // if (loading) {
  //   return (
  //     <View style={styles.centerContainer}>
  //       <ActivityIndicator size="large" color="#e50914" />
  //       <Text style={styles.loadingText}>Loading movies...</Text>
  //       <Text style={styles.loadingHint}>This might take a few seconds...</Text>
  //     </View>
  //   );
  // }

  // Error state
  // if (error) {
  //   return (
  //     <View style={styles.centerContainer}>
  //       <Text style={styles.errorIcon}>❌</Text>
  //       <Text style={styles.errorText}>Error Loading Movies</Text>
  //       <Text style={styles.errorMessage}>{error}</Text>
  //       <Text style={styles.errorHint}>
  //         Make sure:{'\n'}
  //         • You're connected to the internet{'\n'}
  //         • Your credentials are correct in api.ts{'\n'}
  //         • You've installed base-64 package
  //       </Text>
  //       <Pressable
  //         style={styles.retryButton}
  //         onPress={() => dispatch(fetchMovies())}
  //       >
  //         <Text style={styles.retryButtonText}>Retry</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  // Empty state
  if (movies.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>🎬</Text>
        <Text style={styles.emptyText}>No movies found</Text>
        <Text style={styles.emptyHint}>Try refreshing or check back later</Text>
      </View>
    );
  }

  // Success - render movies
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🎬 Now Playing</Text>
        <Text style={styles.headerSubtitle}>{movies.length} movies</Text>
      </View>
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem movie={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/**
 * Individual movie item component
 */
function MovieItem({ movie }: { movie: Movie }) {
  // Get first trailer key if available
  const trailerKey = movie.trailers?.[0]?.results?.[0]?.key;
  
  return (
    <View style={styles.movieCard}>
      {/* Movie Poster */}
      {movie.poster && (
        <Image
          source={{ uri: movie.poster }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
      )}

      <View style={styles.movieInfo}>
        {/* Movie Title and Year */}
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        
        <Text style={styles.movieYear}>({movie.year})</Text>

        {/* Duration and Certificate */}
        <View style={styles.movieMetaRow}>
          {movie.durationMinutes && (
            <Text style={styles.movieDuration}>
              ⏱️ {formatDuration(movie.durationMinutes)}
            </Text>
          )}
          {movie.certificate && (
            <View style={[styles.certificateBadge, { backgroundColor: getCertificateColor(movie.certificate.color) }]}>
              <Text style={styles.certificateText}>{movie.certificate.is}</Text>
            </View>
          )}
        </View>

        {/* Genres */}
        {movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {movie.genres.slice(0, 3).map((genre) => (
              <View key={genre.ID} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre["NameEN\t"] || genre.Name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* IMDB Rating */}
        {movie.ratings.imdb && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>
              {movie.ratings.imdb}/10 <Text style={styles.ratingLabel}>IMDB</Text>
            </Text>
          </View>
        )}

        {/* Trailer Link */}
        {trailerKey && (
          <Pressable
            style={styles.trailerButton}
            onPress={() => {
              const url = `https://www.youtube.com/watch?v=${trailerKey}`;
              Linking.openURL(url);
            }}
          >
            <Text style={styles.trailerButtonText}>▶️ Watch Trailer</Text>
          </Pressable>
        )}

        {/* Showtimes Section */}
        <View style={styles.showtimesContainer}>
          <Text style={styles.showtimesHeader}>🎭 Showtimes</Text>
          
          {!movie.showtimes || movie.showtimes.length === 0 ? (
            <Text style={styles.noShowtimes}>No showtimes available</Text>
          ) : (
            movie.showtimes.map((showtime, index) => (
              <ShowtimeItem key={index} showtime={showtime} />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

/**
 * Individual showtime (cinema) component
 */
function ShowtimeItem({ showtime }: { showtime: Showtime }) {
  return (
    <View style={styles.showtimeItem}>
      {/* Cinema Name */}
      <Text style={styles.cinemaName}>📍 {showtime.cinema.name}</Text>
      
      {/* Schedule Times */}
      <View style={styles.scheduleContainer}>
        {showtime.schedule.map((scheduleItem, idx) => (
          <Pressable
            key={idx}
            style={styles.timeChip}
            onPress={() => {
              if (scheduleItem.purchase_url) {
                Linking.openURL(scheduleItem.purchase_url);
              }
            }}
          >
            <Text style={styles.timeText}>{scheduleItem.time}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/**
 * Helper function to format duration
 */
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}

/**
 * Helper function to get certificate badge color
 */
function getCertificateColor(color: string): string {
  const colors: Record<string, string> = {
    'green': '#4caf50',
    'yellow': '#ffc107',
    'orange': '#ff9800',
    'red': '#f44336',
  };
  return colors[color.toLowerCase()] || '#999';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#141414',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e50914',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  
  // Loading states
  loadingText: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 18,
  },
  loadingHint: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  
  // Error states
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorText: {
    color: '#e50914',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorHint: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e50914',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Empty state
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyHint: {
    color: '#999',
    fontSize: 14,
  },
  
  // Movie Card
  movieCard: {
    backgroundColor: '#141414',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  moviePoster: {
    width: '100%',
    height: 400,
    backgroundColor: '#222',
  },
  movieInfo: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 16,
    color: '#999',
    marginBottom: 12,
  },
  movieMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  movieDuration: {
    fontSize: 14,
    color: '#999',
  },
  certificateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  certificateText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Genres
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  genreChip: {
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  genreText: {
    color: '#ffffff',
    fontSize: 12,
  },
  
  // Rating
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  ratingText: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingLabel: {
    color: '#999',
    fontSize: 12,
    fontWeight: 'normal',
  },
  
  // Trailer
  trailerButton: {
    backgroundColor: '#e50914',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  trailerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Showtimes
  showtimesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  showtimesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e50914',
    marginBottom: 12,
  },
  noShowtimes: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: 14,
  },
  showtimeItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    backgroundColor: '#222',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  timeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
});