import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type FooterTab = {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const TABS: FooterTab[] = [
  { label: "Cinemas",    route: "/home-screen", icon: "film-outline" },
  { label: "Favourites", route: "/favourites",  icon: "heart-outline" },
  { label: "Upcoming",   route: "/upcoming",    icon: "time-outline" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (route: string) => {
    if (pathname === route) return;
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.route;

        return (
          <Pressable
            key={tab.route}
            onPress={() => handlePress(tab.route)}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={28}
              style={styles.icon}
              color={isActive ? "#FF748B" : "#C4C4C4"}
            />

            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
