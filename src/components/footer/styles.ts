import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tabActive: {},
  tabPressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 12,
    color: "#FF748B",
  },
  labelActive: {
    fontWeight: "600",
  },
});