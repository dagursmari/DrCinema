import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { loadStoredAuth, logoutUser } from "@/src/redux/slices/auth-slice";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export function Main() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [hasStoredUser, setHasStoredUser] = useState(false);

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        checkStoredAuth();
    }, []);

    const checkStoredAuth = async () => {
        setIsCheckingAuth(true);

        try {
            const result = await dispatch(loadStoredAuth()).unwrap();

            if (result && result.user) {
                setHasStoredUser(true);
            } else {
                setHasStoredUser(false);
            }
        } catch (error) {
            setHasStoredUser(false);
        }

        setIsCheckingAuth(false);

        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(buttonsOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleContinueAsStoredUser = () => {
        router.replace("/home-screen");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleSignup = () => {
        router.push("/signup");
    };

    const handleContinueAsGuest = async () => {
        await dispatch(logoutUser());

        setHasStoredUser(false);

        router.replace("/home-screen");
    };

    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                    },
                ]}
            >
                <Image
                    source={require("../../../assets/images/DrCinemaLogo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Buttons Section */}
            <Animated.View
                style={[
                    styles.buttonsContainer,
                    {
                        opacity: buttonsOpacity,
                    },
                ]}
            >
                {/* Show "Continue as [User]" if we have a stored user */}
                {hasStoredUser && user && !isCheckingAuth ? (
                    <TouchableOpacity
                        onPress={handleContinueAsStoredUser}
                        style={styles.continueAsUserButton}
                        activeOpacity={0.8}
                    >
                        <View style={styles.userButtonContent}>
                            {user.profileImage ? (
                                <Image
                                    source={{ uri: user.profileImage }}
                                    style={styles.userAvatar}
                                />
                            ) : (
                                <View style={styles.userAvatarPlaceholder}>
                                    <Text style={styles.userAvatarText}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.userInfo}>
                                <Text style={styles.continueAsText}>Continue as</Text>
                                <Text style={styles.userName}>{user.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : null}

                {/* Login Button */}
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.signupButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signupButtonText}>Log in</Text>
                </TouchableOpacity>

                {/* Continue as Guest Button */}
                <TouchableOpacity
                    onPress={handleContinueAsGuest}
                    style={styles.guestButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.guestButtonText}>Continue as guest</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.signupPrompt}>
                    <Text style={styles.signupPromptText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignup} activeOpacity={0.7}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}