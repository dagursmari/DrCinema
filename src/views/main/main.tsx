import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";

export function Main() {
    const router = useRouter();

    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            // Logo fade in and scale up
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
        ]).start();
    }, []);

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

// import { useRouter } from "expo-router";
// import { Text, TouchableOpacity, View } from "react-native";
// import styles from "./styles";

// export function Main() {
//     const router = useRouter();

//     const handlePress = () => {
//     router.push("/home-screen")
//     };
//     const handleTest = () => {
//     router.push("/test-movie")
//     };
//     const handleAuth = () => {
//     router.push("/test-auth")
//     };
//     return (
//         <View style={styles.container}>
//             <Text>Text for LOADING SCREEN</Text>

//             <TouchableOpacity
//                 onPress={handlePress}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={handleTest}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}>Test</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={handleAuth}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}>Test Auth</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }