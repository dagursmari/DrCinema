import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export function Main() {
    const router = useRouter();

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in logo first
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            // Fade in buttons after logo
            Animated.timing(buttonsOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
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
                </Animated.View>
        </View>
    );
}