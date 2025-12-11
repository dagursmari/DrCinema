import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface WelcomeButtonsProps {
    onSignup: () => void;
    onContinueAsGuest: () => void;
    showTestButtons?: boolean;
    onTestMovies?: () => void;
    onTestAuth?: () => void;
}

export function WelcomeButtons({
    onSignup,
    onContinueAsGuest,
    showTestButtons = false,
    onTestMovies,
    onTestAuth
}: WelcomeButtonsProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onSignup}
                style={styles.signupButton}
                activeOpacity={0.8}
            >
                <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onContinueAsGuest}
                style={styles.guestButton}
                activeOpacity={0.8}
            >
                <Text style={styles.guestButtonText}>Continue as guest</Text>
            </TouchableOpacity>

            {showTestButtons && (
                <>
                    {onTestMovies && (
                        <TouchableOpacity
                            onPress={onTestMovies}
                            style={styles.testButton}
                        >
                            <Text style={styles.testButtonText}>Test Movies</Text>
                        </TouchableOpacity>
                    )}

                    {onTestAuth && (
                        <TouchableOpacity
                            onPress={onTestAuth}
                            style={styles.testButton}
                        >
                            <Text style={styles.testButtonText}>Test Auth</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}