import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";



export function Main() {

    return (
        <View style={styles.container}>
            <Text>Text for LOADING SCREEN</Text>

            <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}>LOG IN BUTTON</Text>
            </TouchableOpacity>
        </View>
    )
}