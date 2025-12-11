import { StyleSheet } from "react-native";
import { shadow, mainPink, black, lightGray, white } from "@/src/styles/colors";


export default StyleSheet.create({
    container: {
    gap: 24,
  },

  cinemaSection: {
    gap: 12,
  },

  cinemaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
  },

  cinemaName: {
    fontSize: 18,
    fontWeight: 600,
    color: black,
  },

  timesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  timePill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: white,
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: lightGray,
  },

  timePillSelected: {
    backgroundColor: white,
    borderColor: mainPink,
    shadowColor: mainPink,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  timeText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#666",
  },

  timeTextSelected: {
    color: mainPink,
    fontWeight: 600,
  },

  buyButton: {
    backgroundColor: mainPink,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  buyButtonDisabled: {
    backgroundColor: "#ccc",
  },

  buyButtonText: {
    color: white,
    fontSize: 18,
    fontWeight: 600,
  },
});