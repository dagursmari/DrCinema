import { StyleSheet } from "react-native";
import { shadow, black, white, lighterGray } from "@/src/styles/colors";


export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: white,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lighterGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 36,
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 10,
  },

  searchIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: black,
    padding: 0,
  },

  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
  },
});