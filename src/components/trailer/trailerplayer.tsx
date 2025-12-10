import React from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./styles";

interface Trailer {
  key: string;
  name: string;
}

interface TrailerPlayerProps {
  trailer?: Trailer | null;
}

export function TrailerPlayer({ trailer }: TrailerPlayerProps) {
  if (!trailer) return <Text style={styles.alternativeTrailer}>No trailer available</Text>;

  const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: youtubeUrl }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}