import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    marginHorizontal:10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 96, // room for footer at the bottom
  },
  cinemaName: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 10,
    color: "#111111",
  },
  description: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 12,
  },
  infoRow: {
    marginTop:8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight:"400",
    color: "#444444",
    flexShrink: 1,
  },
  linkText: {
    color: "#FF748B",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: "#777777",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
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
  },
});