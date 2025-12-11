import { StyleSheet } from "react-native";
import { white, shadow, mainPink } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 150,
        paddingBottom: 60,
        paddingHorizontal: 40,
    },

    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 600,
        height: 600,
    },

    buttonsContainer: {
        width: "100%",
        gap: 16,
        paddingBottom: 20,
    },

    signupButton: {
        backgroundColor: mainPink,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        shadowColor: mainPink,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    signupButtonText: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    guestButton: {
        backgroundColor: white,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        borderWidth: 2,
        borderColor: mainPink,
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    guestButtonText: {
        color: mainPink,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 600,
        color: mainPink,
        marginBottom: 40,
        textAlign: "center",
    },
});