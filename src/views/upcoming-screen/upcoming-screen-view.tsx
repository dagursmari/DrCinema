import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { fetchUpcomingMovies } from '@/src/redux/slices/upcomming-slice';
import { UpcomingList } from '@/src/components/upcoming-list/upcoming-list';
import { ScreenWithFooter } from '../footer/ScreenWithFooter';
import styles from './styles';

export function UpcomingMoviesScreen() {
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const { upcomingMovies, loading, error } = useAppSelector(
    (state) => state.upcoming
  );

  // Fetch upcoming movies when component mounts
  useEffect(() => {
    console.log('📅 UpcomingMoviesScreen: Fetching upcoming movies...');
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <ScreenWithFooter>
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
          <Text style={styles.header}>Upcoming</Text>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#FF3366" />
            <Text style={styles.loadingText}>Loading upcoming movies...</Text>
          </View>
        </SafeAreaView>
      </ScreenWithFooter>
    );
  }

  // Error state
  if (error) {
    return (
      <ScreenWithFooter>
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
          <Text style={styles.header}>Upcoming</Text>
          <View style={styles.centerContainer}>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>Error loading movies</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => dispatch(fetchUpcomingMovies())}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScreenWithFooter>
    );
  }

  // Success - render the list
  return (
    <ScreenWithFooter>
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <Text style={styles.header}>Upcoming</Text>

        {/* Movie Count */}
        {upcomingMovies.length > 0 && (
          <Text style={styles.subtitle}>
            {upcomingMovies.length} {upcomingMovies.length === 1 ? 'movie' : 'movies'} coming soon
          </Text>
        )}

        {/* Upcoming Movies List */}
        <UpcomingList movies={upcomingMovies} />
      </SafeAreaView>
    </ScreenWithFooter>
  );
}