// src/views/footer/styles.ts
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  footerOverlay: {
    // full-screen overlay
    ...StyleSheet.absoluteFillObject,
    // stick children to the bottom
    justifyContent: "flex-end",
  },
});