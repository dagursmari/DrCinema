import { StyleSheet } from "react-native";
import { white, shadow, mainPink } from "@/src/styles/colors";

export default StyleSheet.create({
    formContainer: {
        width: "100%",
        paddingTop: 40,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: mainPink,
        marginBottom: 30,
        textAlign: "center",
    },

    profileImageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },

    profileImageButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        marginBottom: 8,
    },

    profileImage: {
        width: "100%",
        height: "100%",
    },

    profileImagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E9ECEF",
        borderStyle: "dashed",
    },

    profileImageIcon: {
        fontSize: 40,
        marginBottom: 4,
    },

    profileImageText: {
        fontSize: 12,
        color: "#666",
        fontWeight: "600",
    },

    profileImageHint: {
        fontSize: 12,
        color: "#999",
        textAlign: "center",
    },

    inputContainer: {
        marginBottom: 25,
    },

    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
    },

    input: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: "#E9ECEF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: "#1a1a1a",
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    inputError: {
        borderColor: "#E94560",
        borderWidth: 2,
    },

    errorText: {
        color: "#E94560",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500",
    },

    signupButton: {
        backgroundColor: "#E94560",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#E94560",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    signupButtonText: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    cancelButton: {
        backgroundColor: white,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 16,
        borderWidth: 2,
        borderColor: "#E94560",
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    cancelButtonText: {
        color: mainPink,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});