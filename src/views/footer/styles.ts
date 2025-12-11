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
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
});