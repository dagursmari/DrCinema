import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logoutUser } from "@/src/redux/slices/auth-slice";
import { BuildUserFavouritesKey, GetFavourites } from "@/src/services/favourites-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ScreenWithFooter } from "@/src/views/footer/ScreenWithFooter";

export function UserDetailComp() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const [favoritesCount, setFavoritesCount] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            loadFavoritesCount();
        }, [])
    );

    const loadFavoritesCount = async () => {
        const userKey = BuildUserFavouritesKey(user);
        const favorites = await GetFavourites(userKey);
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