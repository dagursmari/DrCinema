import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router"

const handlePress = () => {
    router.push("/home-screen")
};

export function Main() {
    const router = useRouter();

    const handlePress = () => {
    router.push("/home-screen")
    };
    return (
        <View style={styles.container}>
            <Text>Text for LOADING SCREEN</Text>

            <TouchableOpacity
                onPress={handlePress}
                style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}