import { StyleSheet } from "react-native";
import { white } from "@/src/styles/colors";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
});