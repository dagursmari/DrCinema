import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import styles from "./styles";

type FooterTab = {
  label: string;
  route: string;
};

const TABS: FooterTab[] = [
  { label: "Cinemas", route: "/cinemas-screen" },
  { label: "Favourites", route: "/favourites" },
  { label: "Upcoming", route: "/upcoming" },
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
              isActive && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
