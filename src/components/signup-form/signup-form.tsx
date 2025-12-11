import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { clearAuthError, registerUser } from "@/src/redux/slices/auth-slice";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./styles";import * as ImagePicker from "expo-image-picker";
import {Platform } from "react-native";

interface SignupFormProps {
    onSuccess: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

    // Validation errors
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Please enter a valid email";
        return "";
    };

    const validateName = (name: string) => {
        if (!name) return "Name is required";
        if (name.length < 2) return "Name must be at least 2 characters";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (!confirmPassword) return "Please confirm your password";
        if (password !== confirmPassword) return "Passwords do not match";
        return "";
    };

    // TODO: Your classmate will implement this function
    const handleSelectProfileImage = () => {
        Alert.alert("Select Image", "Choose an option", [
    {
      text: "Choose from Library",
      onPress: async () => {
        // Ask for media library permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission required to access photos.");
          return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });

        if (!result.canceled) {
          const asset = result.assets[0];
          setProfileImage(asset.uri);
        }
      },
    },
    {
      text: "Take Photo",
      onPress: async () => {
        // Ask for camera permission
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Permission required to access camera.");
          return;
        }

        // Launch camera (iOS native camera)
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.8,
        });

        if (!result.canceled) {
          const asset = result.assets[0];
          setProfileImage(asset.uri);
        }
      },
    },
    { text: "Cancel", style: "cancel" },
  ]);
};

    const handleSignup = async () => {
        // Clear previous errors
        setEmailError("");
        setNameError("");
        setPasswordError("");
        setConfirmPasswordError("");
        dispatch(clearAuthError());

        // Validate all fields
        const emailErr = validateEmail(email);
        const nameErr = validateName(fullName);
        const passwordErr = validatePassword(password);
        const confirmPasswordErr = validateConfirmPassword(password, confirmPassword);

        if (emailErr || nameErr || passwordErr || confirmPasswordErr) {
            setEmailError(emailErr);
            setNameError(nameErr);
            setPasswordError(passwordErr);
            setConfirmPasswordError(confirmPasswordErr);
            return;
        }

        try {
            await dispatch(
                registerUser({
                    email,
                    name: fullName,
                    password,
                    confirmPassword,
                    profileImage,
                })
            ).unwrap();

            Alert.alert(
                "Success!",
                "Your account has been created successfully!",
                [
                    {
                        text: "Continue",
                        onPress: onSuccess,
                    }
                ]
            );
        } catch (error: any) {
            Alert.alert("Sign Up Failed", error || "Please try again");
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {/* Profile Image Picker */}
            <View style={styles.profileImageContainer}>
                <TouchableOpacity
                    style={styles.profileImageButton}
                    onPress={handleSelectProfileImage}
                    activeOpacity={0.7}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileImageIcon}>👤</Text>
                            <Text style={styles.profileImageText}>Add Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <Text style={styles.profileImageHint}>
                    Tap to add profile picture (optional)
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={[styles.input, nameError ? styles.inputError : null]}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={(text) => {
                        setFullName(text);
                        setNameError("");
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>

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

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[styles.input, confirmPasswordError ? styles.inputError : null]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        setConfirmPasswordError("");
                    }}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {confirmPasswordError ? (
                    <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}
            </View>

            <TouchableOpacity
                style={[styles.signupButton, loading && styles.buttonDisabled]}
                onPress={handleSignup}
                disabled={loading}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.signupButtonText}>Sign up</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.push("/")}
                activeOpacity={0.8}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}