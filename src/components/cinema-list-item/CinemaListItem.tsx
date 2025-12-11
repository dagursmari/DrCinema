import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import type { Cinema } from "@/src/redux/types";

type Props = {
  cinema: Cinema;
  onPress: () => void;
};

export default function CinemaListItem({ cinema, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {cinema.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {cinema.website}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#333" />
    </Pressable>
  );
}
