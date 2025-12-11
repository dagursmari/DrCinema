import { StyleSheet } from "react-native";
import { mainPink, shadow, white } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        width: "100%",
        gap: 16,
    },

    signupButton: {
        backgroundColor: mainPink,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        shadowColor: shadow,
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

    testButton: {
        backgroundColor: "#F8F9FA",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E9ECEF",
        marginTop: 8,
    },

    testButtonText: {
        color: "#6c757d",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
});