import { useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export function UserDetailComp() {
    const router = useRouter()
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const onEdit = () => {
        router.push("/edit-profile");
    };

    if (!isAuthenticated || !user) return null;

    return (
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
                    editable={false} // make it read-only unless editing
                    style={styles.input}
                />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={user.email}
                    editable={false}
                    style={styles.input}
                />
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Statistics */}
            <View style={styles.statistics}>
            <Text>Favorites</Text>
            <Text>Bookings</Text>
            </View>
            
        </View>
    );
}
