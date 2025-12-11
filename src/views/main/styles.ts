import { StyleSheet } from "react-native";
import { mainPink, white } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    logoContainer: {
        marginBottom: 0,
        alignItems: "center",
    },

    logo: {
        width: 450,
        height: 450,
    },

    buttonsContainer: {
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
    },

    continueAsUserButton: {
        width: "100%",
        backgroundColor: mainPink,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    userButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
        borderWidth: 2,
        borderColor: white,
    },

    userAvatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: white,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    userAvatarText: {
        color: mainPink,
        fontSize: 16,
        fontWeight: "bold",
    },

    userInfo: {
        alignItems: "flex-start",
    },

    continueAsText: {
        color: white,
        fontSize: 12,
        opacity: 0.9,
    },

    userName: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
    },

    signupButton: {
        width: "100%",
        backgroundColor: mainPink,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    signupButtonText: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    guestButton: {
        width: "100%",
        backgroundColor: white,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 2,
        borderColor: mainPink,
        shadowColor: "#000",
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
        fontSize: 14,
        color: mainPink,
        textAlign: "center",
        marginTop: 8,
        fontWeight: "600",
    },
    signupPrompt: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 16,
    },

    signupPromptText: {
        color: "#666",
        fontSize: 14,
    },

    signupLink: {
        color: mainPink,
        fontSize: 14,
        fontWeight: "bold",
    },
});
