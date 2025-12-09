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
        // Start animation immediately
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

    const handleTestMovies = () => {
        router.push("/test-movie");
    };

    const handleTestAuth = () => {
        router.push("/test-auth");
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
                        onPress={handleSignup}
                        style={styles.signupButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.signupButtonText}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleContinueAsGuest}
                        style={styles.guestButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.guestButtonText}>Continue as guest</Text>
                    </TouchableOpacity>

                    {/* Test buttons */}
                    <TouchableOpacity
                        onPress={handleTestMovies}
                        style={styles.testButton}
                    >
                        <Text style={styles.testButtonText}>Test Movies</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleTestAuth}
                        style={styles.testButton}
                    >
                        <Text style={styles.testButtonText}>Test Auth</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
// import { useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { Animated, View, Image, Text, TouchableOpacity } from "react-native";
// import styles from "./styles";

// export function Main() {
//     const router = useRouter();
//     const [showButtons, setShowButtons] = useState(false);

//     const logoScale = useRef(new Animated.Value(0.3)).current;
//     const logoOpacity = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.sequence([
//             Animated.parallel([
//                 Animated.timing(logoOpacity, {
//                     toValue: 1,
//                     duration: 800,
//                     useNativeDriver: true,
//                 }),
//                 Animated.spring(logoScale, {
//                     toValue: 1,
//                     tension: 50,
//                     friction: 7,
//                     useNativeDriver: true,
//                 }),
//             ]),
//             Animated.delay(400),
//         ]).start(() => {
//             setShowButtons(true);
//         });
//     }, []);

//     const handleSignup = () => {
//         router.push("/Signup");
//     };

//     const handleContinueAsGuest = () => {
//         router.push("/home-screen");
//     };

//     return (
//         <View style={styles.container}>
//             {/* Logo Section */}
//             <Animated.View
//                 style={[
//                     styles.logoContainer,
//                     {
//                         opacity: logoOpacity,
//                         transform: [{ scale: logoScale }],
//                     },
//                 ]}
//             >
//                 <Image
//                     source={require("../../../assets/images/DrCinemaLogo.png")}
//                     style={styles.logo}
//                     resizeMode="contain"
//                 />
//             </Animated.View>

//             {/* Buttons Section */}
//             {showButtons && (
//                 <View style={styles.buttonsContainer}>
//                     <TouchableOpacity
//                         onPress={handleSignup}
//                         style={styles.signupButton}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={styles.signupButtonText}>Sign up</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={handleContinueAsGuest}
//                         style={styles.guestButton}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={styles.guestButtonText}>Continue as guest</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     );
// }