import { StyleSheet } from "react-native";
import { white } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "center",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 600,
        height: 600,
    },
});