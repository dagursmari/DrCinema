import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LoginForm } from "@/src/components/login-form/login-form";
import styles from "./styles";

export function LoginView() {
    const router = useRouter();

    const handleSuccess = () => {
        // Navigate to home screen after successful login
        router.replace("/home-screen");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <LoginForm onSuccess={handleSuccess} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}