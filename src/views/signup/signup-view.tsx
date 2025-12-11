import { SignupForm } from "@/src/components/signup-form/signup-form";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styles from "./styles";

export function SignupView() {
    const router = useRouter();

    const handleSuccess = () => {
        router.replace("/home-screen");
    };

    const handleContinueAsGuest = () => {
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
                <SignupForm
                    onSuccess={handleSuccess}
                    onContinueAsGuest={handleContinueAsGuest}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
