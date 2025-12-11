import { StyleSheet } from "react-native";
import { black, mainPink } from "@/src/styles/colors";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
  },
  cardActive: {
    backgroundColor: "#FFF5F7"
  },

  handle: {
    marginRight: 10
  },

  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  textContainer: {
    flex: 1
  },

  title: {
    fontSize: 16,
    fontWeight: "700"
  },

  metaRow: {
    flexDirection: "row",
    marginTop: 4
  },

  year: {
    fontSize: 13,
    color: "#666"
  },

  genre: {
    fontSize: 13,
    color: mainPink,
  },

  removeButton: {
    backgroundColor: "#FFE3EA",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  removeText: {
    color: mainPink,
    fontWeight: "700",
  },
});
