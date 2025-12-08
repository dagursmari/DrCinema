import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: 160,
    marginRight: 16,
  },

  poster: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  year: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },

  badge: {
    backgroundColor: "rgba(255, 182, 193, 0.3)", 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#E46C8A", 
    fontSize: 12,
    fontWeight: "600",
  },
});
