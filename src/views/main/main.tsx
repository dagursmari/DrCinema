import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { loadStoredAuth } from "@/src/redux/slices/auth-slice";
import styles from "./styles";

export function Main() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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
            // Load stored auth data
            const result = await dispatch(loadStoredAuth()).unwrap();
            
            // Check if we found a stored user
            if (result && result.user) {
                setHasStoredUser(true);
            } else {
                setHasStoredUser(false);
            }
        } catch (error) {
            setHasStoredUser(false);
        }
        
        setIsCheckingAuth(false);

        // Start animations after checking auth
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
        // User is already loaded in Redux
        router.replace("/home-screen");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleSignup = () => {
        router.push("/signup");
    };

    const handleContinueAsGuest = () => {
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
                <TouchableOpacity onPress={handleSignup}>
                    <Text style={styles.subtitle}>
                        Dont have an account? Sign up here
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}