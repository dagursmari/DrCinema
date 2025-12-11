import React, { useState } from "react";
import { Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import styles from "./styles";

interface Trailer {
  key: string;
  name: string;
}

interface TrailerPlayerProps {
  trailer?: Trailer | null;
}

export function TrailerPlayer({ trailer }: TrailerPlayerProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!trailer) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTrailerText}>No trailer available</Text>
      </View>
    );
  }

  const handleWatchTrailer = () => {
    setShowTrailer(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.trailerButton}
          onPress={handleWatchTrailer}
          activeOpacity={0.7}
        >
          <Text style={styles.trailerIcon}>▶</Text>
          <Text style={styles.trailerText}>Watch trailer</Text>
        </TouchableOpacity>
      </View>

      {/* Full Screen Trailer Modal */}
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
            <Text style={styles.trailerTitle}>{trailer.name}</Text>

            {/* YouTube Player */}
            <View style={styles.playerContainer}>
              <YoutubePlayer
                height={250}
                videoId={trailer.key}
                play={showTrailer}
                webViewStyle={{ opacity: 0.99 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}