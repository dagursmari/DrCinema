// src/components/footer/styles.ts
import { StyleSheet } from "react-native";
import { black, mainPink } from "@/src/styles/colors";


export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    height: 75,
    paddingBottom: 10,
    paddingHorizontal: 24,

    backgroundColor: "#F9F9F9",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPressed: {
    opacity: 0.6,
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: "#C4C4C4",
  },
  labelActive: {
    color: mainPink,
    fontWeight: "600",
  },
});