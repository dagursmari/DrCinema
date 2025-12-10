import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        marginVertical: 10,
    },
        webview: {
        width: width - 20,
        height: ((width - 20) * 9) / 16,
        marginHorizontal:5
    },
    alternativeTrailer: {
        fontSize:16,
        fontWeight:"500",
        marginHorizontal:20
    }
})