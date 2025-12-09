import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  listContent: {
    paddingBottom: 50, // small gap above the footer
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF748B",
    marginTop: 16,
    marginBottom: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    fontSize: 14,
    color: "#e50914",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});