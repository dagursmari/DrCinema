import { StyleSheet } from "react-native";
//import { white, black} from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    button: {
        marginTop: 30,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },

    buttonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }

})