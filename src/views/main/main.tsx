import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export function Main() {
    const router = useRouter();
    const [showButtons, setShowButtons] = useState(false);

    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(400),
        ]).start(() => {
            setShowButtons(true);
        });
    }, []);

    const handleSignup = () => {
        router.push("/signup"); 
    };

    const handleContinueAsGuest = () => {
        router.push("/home-screen");
    };

    const handleLogin = () => {
        router.push("/login"); 
    };


    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
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
            {showButtons && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.signupButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.signupButtonText}>Log in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleContinueAsGuest}
                        style={styles.guestButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.guestButtonText}>Continue as guest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSignup}
                    >
                        <Text style={styles.subtitle}>Dont have an account? Sign up here</Text>
                    </TouchableOpacity>


                </View>
            )}
        </View>
    );
}