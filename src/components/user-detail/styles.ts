import { mainPink } from "@/src/styles/colors";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    image:{
        marginTop:30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    altProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: mainPink,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    altProfileText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 15,
        marginHorizontal:10,
    },
    input: {
        marginHorizontal:10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    editButton: {
        marginTop: 20,
        backgroundColor: mainPink,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 45,
    },
    editButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    statistics:{
        marginTop:25
    }
});
