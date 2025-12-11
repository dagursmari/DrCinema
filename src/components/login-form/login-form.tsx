import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { loginUser, clearAuthError } from "@/src/redux/slices/auth-slice";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";

interface LoginFormProps {
    onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validation errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Please enter a valid email";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleLogin = async () => {
        // Clear previous errors
        setEmailError("");
        setPasswordError("");
        dispatch(clearAuthError());

        // Validate fields
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        if (emailErr || passwordErr) {
            setEmailError(emailErr);
            setPasswordError(passwordErr);
            return;
        }

        try {
            // Dispatch Redux action
            await dispatch(
                loginUser({
                    email,
                    password,
                })
            ).unwrap();

            // Success!
            Alert.alert(
                "Welcome Back! 👋",
                "You have successfully logged in!",
                [
                    {
                        text: "Continue",
                        onPress: onSuccess,
                    }
                ]
            );
        } catch (error: any) {
            // Error is already in Redux state
            Alert.alert("Login Failed", error || "Please check your credentials and try again");
        }
    };

    const handleForgotPassword = () => {
        // TODO: Implement forgot password functionality
        Alert.alert(
            "Forgot Password",
            "Password reset will be implemented here",
            [{ text: "OK" }]
        );
    };

    const handleSignUp = () => {
        router.push("/signup");
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError("");
                    }}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                activeOpacity={0.7}
            >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginButton, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.push("/")}
                activeOpacity={0.8}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupPrompt}>
                <Text style={styles.signupPromptText}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}