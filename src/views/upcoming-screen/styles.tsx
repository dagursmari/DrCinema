import { StyleSheet } from "react-native";
import { white, shadow, mainPink, black } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: white,
  },
  
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: black,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    color: mainPink,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 12,
    color: "#666",
    fontSize: 16,
  },

  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },

  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3366",
    marginBottom: 8,
  },

  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#FF3366",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },

  retryButtonText: {
    color: white,
    fontSize: 16,
    fontWeight: "600",
  },
})