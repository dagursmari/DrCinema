import { StyleSheet } from "react-native";
import { white, shadow, mainPink } from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingBottom: 60,
        paddingHorizontal: 40,
    },

    image: {
        marginBottom: 0,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: mainPink,
    },

    altProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: mainPink,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: mainPink,
    },

    altProfileText: {
        fontSize: 48,
        fontWeight: "bold",
        color: white,
    },

    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#E9ECEF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: "#1a1a1a",
    },

    editButton: {
        backgroundColor: mainPink,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
        shadowColor: mainPink,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    editButtonText: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
    },

    statisticsContainer: {
        width: "100%",
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },

    statisticsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 16,
        textAlign: "center",
    },

    statisticsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    statItem: {
        flex: 1,
        alignItems: "center",
    },

    statNumber: {
        fontSize: 32,
        fontWeight: "bold",
        color: mainPink,
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 14,
        color: "#666",
        fontWeight: "600",
    },

    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#E9ECEF",
    },

    logoutButton: {
        backgroundColor: white,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: "center",
        width: "100%",
        borderWidth: 2,
        borderColor: "#FF4444",
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    logoutButtonText: {
        color: "#FF4444",
        fontSize: 18,
        fontWeight: "bold",
    },
});