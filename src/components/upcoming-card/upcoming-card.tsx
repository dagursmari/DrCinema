import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StatusBar } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import type { UpcomingMovie } from '@/src/redux/types';
import styles from './styles';

interface UpcomingCardProps {
  movie: UpcomingMovie;
}

export function UpcomingCard({ movie }: UpcomingCardProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní',
      'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const getFirstGenre = () => {
    if (!movie.genres || movie.genres.length === 0) {
      return 'Óþekkt';
    }
    return movie.genres[0].Name || 'Óþekkt';
  };

  const trailers = movie.trailers?.[0]?.results ?? [];
  const officialTrailer = trailers.find(trailer =>
    trailer.name.toLowerCase().includes("official trailer")
  ) ?? null;

  const trailerKey = officialTrailer?.key;
  const trailerName = officialTrailer?.name;

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  return (
    <>
      <View style={styles.card}>
        {/* Movie Poster */}
        <View style={styles.posterContainer}>
          {movie.poster ? (
            <Image
              source={{ uri: movie.poster }}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.poster, styles.placeholderPoster]}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          {/* Genre */}
          <Text style={styles.genre}>{getFirstGenre()}</Text>

          {/* Release Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>
              {formatDate(movie["release-dateIS"])}
            </Text>
          </View>

          {/* Watch Trailer Button */}
          {trailerKey && (
            <TouchableOpacity
              style={styles.trailerButton}
              onPress={handleWatchTrailer}
              activeOpacity={0.7}
            >
              <Text style={styles.trailerIcon}>▶</Text>
              <Text style={styles.trailerText}>Watch trailer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Simple Full Screen Trailer Modal */}
      {trailerKey && (
        <Modal
          visible={showTrailer}
          animationType="fade"
          presentationStyle="fullScreen"
          onRequestClose={() => setShowTrailer(false)}
        >
          <StatusBar hidden />
          <View style={styles.fullScreenModal}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTrailer(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Centered Content */}
            <View style={styles.centeredContent}>
              {/* Trailer Name */}
              <Text style={styles.trailerTitle}>{trailerName}</Text>

              {/* YouTube Player */}
              <View style={styles.playerContainer}>
                <YoutubePlayer
                  height={250}
                  videoId={trailerKey}
                  play={showTrailer}
                  webViewStyle={{ opacity: 0.99 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}