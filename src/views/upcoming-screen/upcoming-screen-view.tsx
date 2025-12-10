import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { fetchUpcomingMovies } from '@/src/redux/slices/upcomming-slice';
import { ScreenWithFooter } from '../footer/ScreenWithFooter';

export function UpcomingMoviesScreen() {

    const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const { upcomingMovies, loading, error } = useAppSelector(
    (state) => state.upcoming
  );

  // Fetch upcoming movies when component mounts
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  // Show loading spinner
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading upcoming movies...</Text>
      </View>
    );
  }

  // Show error message
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

    return(
    <ScreenWithFooter>
    <View>
        <Text>UPCOMING</Text>
        {/* upcoming list component */}
    </View>
    </ScreenWithFooter>
    )
}