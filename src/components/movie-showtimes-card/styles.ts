import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    position: "relative",
  },
  poster: {
    width: 90,
    height: 130,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingRight: 32, // give some room so text doesn't go under the heart
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  year: {
    fontSize: 12,
    color: "#777777",
  },
  dot: {
    fontSize: 12,
    color: "#777777",
  },
  genre: {
    fontSize: 12,
    color: "#FF748B",
  },
  showtimesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  // Make chips pop more
    chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",   // back to white
    borderWidth: 1,
    borderColor: "#E5E7EB",        // light gray border
    marginRight: 8,
    marginBottom: 6,

    // iOS shadow for pop ✨
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    },

    chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111111",   // back to dark text
    },
  // Heart in the middle-right
  favouriteButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -18, // half of button size to center vertically
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});