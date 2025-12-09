import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export function Main() {
    const router = useRouter();

    const handlePress = () => {
    router.push("/home-screen")
    };
    const handleTest = () => {
    router.push("/test-movie")
    };
    const handleAuth = () => {
    router.push("/test-auth")
    };
    return (
        <View style={styles.container}>
            <Text>Text for LOADING SCREEN</Text>

            <TouchableOpacity
                onPress={handlePress}
                style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleTest}
                style={styles.button}>
                <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleAuth}
                style={styles.button}>
                <Text style={styles.buttonText}>Test Auth</Text>
            </TouchableOpacity>
        </View>
    )
}