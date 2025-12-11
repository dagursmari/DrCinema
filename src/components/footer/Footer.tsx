import { Feather, Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

type FooterTab = {
  label: string;
  route: string;
  icon: string;
  iconSet: "Ionicons" | "Feather";
};

const tabs: FooterTab[] = [
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

    router.replace(route as any);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        const color = isActive ? "#e94560" : "#C4C4C4";

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
