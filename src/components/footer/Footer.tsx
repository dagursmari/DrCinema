import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "./styles";

type FooterTab = {
  label: string;
  route: string;
  icon: string;
  iconSet: "Ionicons" | "Feather";
};

const TABS: FooterTab[] = [
  {
    label: "Home",
    route: "/home-screen",
    icon: "home-outline",
    iconSet: "Ionicons",
  },
  {
    label: "Cinemas",
    route: "/cinemas-screen",
    icon: "film-outline",
    iconSet: "Ionicons",
  },
  {
    label: "Favourites",
    route: "/favourites",
    icon: "heart",
    iconSet: "Feather",
  },
  {
    label: "Upcoming",
    route: "/upcoming-screen",
    icon: "clock",
    iconSet: "Feather",
  },
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
        const color = isActive ? "#FF748B" : "#C4C4C4";

        return (
          <Pressable
            key={tab.route}
            onPress={() => handlePress(tab.route)}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}
          >
            {tab.iconSet === "Ionicons" ? (
              <Ionicons name={tab.icon as any} size={28} color={color} />
            ) : (
              <Feather name={tab.icon as any} size={28} color={color} />
            )}

            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
