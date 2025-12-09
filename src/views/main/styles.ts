import { StyleSheet } from "react-native";
import { white, black, shadow} from "@/src/styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: white,
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 60,
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    logo: {
        width: 600,
        height: 600,
    },

    button: {
        marginTop: 30,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: white,
        borderRadius: 25,
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },

    buttonText: {
        color: black,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }

})