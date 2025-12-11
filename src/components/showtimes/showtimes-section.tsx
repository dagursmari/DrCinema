import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { incrementBookings } from '@/src/redux/slices/auth-slice';
import styles from './styles';

interface ShowtimeSchedule {
  time: string;
  purchase_url: string;
}

interface Showtime {
  cinema: {
    id: number;
    name: string;
  };
  schedule: ShowtimeSchedule[];
}

interface ShowtimesSectionProps {
  showtimes: Showtime[];
}

export function ShowtimesSection({ showtimes }: ShowtimesSectionProps) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [selectedShowtime, setSelectedShowtime] = useState<ShowtimeSchedule | null>(null);

  const handleShowtimePress = (showtime: ShowtimeSchedule) => {
    setSelectedShowtime(showtime);
  };

  const handleBuyTickets = async () => {
    if (!selectedShowtime) {
      Alert.alert('Please select a showtime', 'Choose a time slot before purchasing tickets.');
      return;
    }

    const url = selectedShowtime.purchase_url;
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      // Increment booking counter if user is logged in
      if (isAuthenticated) {
        dispatch(incrementBookings());
      }

      // Open the ticket purchase URL
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open ticket purchase link');
    }
  };

  return (
    <View style={styles.container}>
      {showtimes.map((showtime, cinemaIndex) => (
        <View key={cinemaIndex} style={styles.cinemaSection}>
          {/* Cinema Name with Icon */}
          <View style={styles.cinemaHeader}>
            <Ionicons name="location" size={24} color="#e94560" />
            <Text style={styles.cinemaName}>{showtime.cinema.name}</Text>
          </View>

          {/* Showtime Pills */}
          <View style={styles.timesContainer}>
            {showtime.schedule.map((schedule, timeIndex) => {
              const isSelected = selectedShowtime?.purchase_url === schedule.purchase_url;
              const displayTime = schedule.time.replace(/\s*\(.*\)/, '');

              return (
                <TouchableOpacity
                  key={timeIndex}
                  style={[
                    styles.timePill,
                    isSelected && styles.timePillSelected
                  ]}
                  onPress={() => handleShowtimePress(schedule)}
                >
                  <Text style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected
                  ]}>
                    {displayTime}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Buy Tickets Button */}
          <TouchableOpacity 
            style={[
              styles.buyButton,
              !selectedShowtime && styles.buyButtonDisabled
            ]}
            onPress={handleBuyTickets}
            disabled={!selectedShowtime}
          >
            <Text style={styles.buyButtonText}>
              Buy Tickets →
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}