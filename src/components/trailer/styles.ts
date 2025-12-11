import { StyleSheet } from "react-native";
import { mainPink, white, black } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        paddingHorizontal: 4,
    },
    trailerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE0E8",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        width: "100%",
    },
    trailerIcon: {
        color: mainPink,
        fontSize: 16,
        marginRight: 8,
    },
    trailerText: {
        color: mainPink,
        fontSize: 18,
        fontWeight: "bold",
    },
    noTrailerText: {
        fontSize: 18,
        fontWeight: 600,
        color: black,
        textAlign: "center",
    },

    fullScreenModal: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    centeredContent: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    trailerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: white,
        marginBottom: 20,
        textAlign: "center",
    },
    playerContainer: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: "#000",
    },
});