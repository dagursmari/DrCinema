import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logoutUser } from "@/src/redux/slices/auth-slice";
import { buildUserFavouritesKey, getFavourites } from "@/src/services/favourites-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { Movie } from "@/src/redux/types";
import styles from "./styles";
import React from "react";
import { ScreenWithFooter } from "@/src/views/footer/ScreenWithFooter";

export function UserDetailComp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    
    const [favoritesCount, setFavoritesCount] = useState(0);

    // Refresh favorites count when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            loadFavoritesCount();
        }, [])
    );

    // Load favorites count from AsyncStorage
    const loadFavoritesCount = async () => {
        const userKey = buildUserFavouritesKey(user);
        const favorites = await getFavourites(userKey);
        setFavoritesCount(favorites.length);
    };

    const onEdit = () => {
        router.push("/edit-profile");
    };

    const onLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await dispatch(logoutUser());
                        router.replace("/");
                    }
                }
            ]
        );
    };

    if (!isAuthenticated || !user) return null;

    // Get bookings count from user object
    const bookingsCount = user.bookingsCount || 0;

    return (
        <ScreenWithFooter>
            <View style={styles.container}>
                <View style={styles.image}>
                    {/* Profile Image */}
                    {user.profileImage ? (
                        <Image
                            source={{ uri: user.profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.altProfileImage}>
                            <Text style={styles.altProfileText}>
                                {user.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={user.name}
                        editable={false}
                        style={styles.input}
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={user.email}
                        editable={false}
                        style={styles.input}
                    />
                </View>

                {/* Statistics */}
                <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsTitle}>Statistics</Text>
                    <View style={styles.statisticsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{favoritesCount}</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{bookingsCount}</Text>
                            <Text style={styles.statLabel}>Bookings</Text>
                        </View>
                    </View>
                </View>

                {/* Edit Profile Button */}
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScreenWithFooter>
    );
}