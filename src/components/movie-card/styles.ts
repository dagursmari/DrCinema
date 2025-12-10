import { StyleSheet } from "react-native";
import { shadow, mainPink, black } from "@/src/styles/colors";

export default StyleSheet.create({
  card: {
    width: 160,
    marginRight: 18,
    backgroundColor: "transparent",
  },

  posterContainer: {
    width: 160,
    height: 240,
    borderRadius: 12,
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginBottom: 10,
  },

  poster: {
    width: 160,
    height: 240,
    borderRadius: 12,
  },

  content: {
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: 700,
    color: black,
    marginBottom: 4,
    lineHeight: 20,
  },

  year: {
    fontSize: 13,
    color: black,
    marginBottom: 8,
  },

  badge: {
    backgroundColor: "rgba(233, 69, 96, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: mainPink,
    fontSize: 12,
    fontWeight: 700,
  },
});