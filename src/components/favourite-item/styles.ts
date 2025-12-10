import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
  },
  cardActive: { backgroundColor: "#FFF5F7" },
  handle: { marginRight: 10 },
  poster: { width: 70, height: 100, borderRadius: 8, marginRight: 12 },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  metaRow: { flexDirection: "row", marginTop: 4 },
  year: { fontSize: 13, color: "#666" },
  genre: { fontSize: 13, color: "#FF748B" },
  removeButton: {
    backgroundColor: "#FFE3EA",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: { color: "#FF748B", fontWeight: "700" },
});
