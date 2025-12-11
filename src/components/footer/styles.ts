// src/components/footer/styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    // FIX: footer was too big → give it a fixed, smaller height
    height: 75,
    paddingBottom: 10,
    paddingHorizontal: 24,

    // slight grey so it pops from the white cards and the background
    backgroundColor: "#F9F9F9",

    // rounded corners
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",

    // iOS shadow, only on the top edge
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPressed: {
    opacity: 0.6,
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: "#C4C4C4",
  },
  labelActive: {
    color: "#FF748B",
    fontWeight: "600",
  },
});