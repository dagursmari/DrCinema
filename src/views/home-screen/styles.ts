import { mainPink, white } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 10,
  },

  searchandfilter:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal:10
  },

  list: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    color: "#6c757d",
    fontSize: 16,
    marginTop: 12,
  },

  errorText: {
    color: mainPink,
    fontSize: 18,
    textAlign: "center",
    fontWeight: 600,
  },

  emptyText: {
    color: "#6c757d",
    fontSize: 16,
    textAlign: "center",
  },
});