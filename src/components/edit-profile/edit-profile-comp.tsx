import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { changePassword, deleteAccount, updateUserProfile } from "@/src/redux/slices/auth-slice";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./styles";

export function EditProfileComp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

  // Password fields
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || !user) return null;

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required to choose a photo.");

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSelectProfileImage = () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Take Photo", onPress: pickFromCamera },
      { text: "Choose from Library", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleChangePassword = async () => {
    // Validate password fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "Please fill in all password fields");

      return;
    }


    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters");

      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match");

      return;
    }

    try {
      setLoading(true);
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
      Alert.alert("Success", "Password changed successfully");

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordSection(false);
    } catch (error: any) {
      Alert.alert("Error", error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleClearBookings = () => {
    Alert.alert(
      "Clear Bookings Counter",
      "Are you sure you want to reset your bookings counter to 0?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              // Reset bookingsCount to 0
              await dispatch(updateUserProfile({ bookingsCount: 0 } as any)).unwrap();
              Alert.alert("Success", "Bookings counter has been reset");
            } catch (error: any) {
              Alert.alert("Error", error || "Failed to clear bookings");
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: async () => {
            // Double confirmation
            Alert.alert(
              "Final Confirmation",
              "This will permanently delete your account. Are you absolutely sure?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Delete",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      setLoading(true);
                      await dispatch(deleteAccount()).unwrap();
                      Alert.alert("Account Deleted", "Your account has been successfully deleted.");
                      router.replace("/");
                    } catch (error: any) {
                      Alert.alert("Error", error || "Failed to delete account");
                      setLoading(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");

      return;
    }

    try {
      setLoading(true);
      await dispatch(updateUserProfile({ name, profileImage })).unwrap();
      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      {/* Profile Image Picker */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity
          style={styles.profileImageButton}
          onPress={handleSelectProfileImage}
          activeOpacity={0.7}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageIcon}>👤</Text>
              <Text style={styles.profileImageText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Tap to change photo</Text>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />
      </View>

      {/* Email Input (Read-only) */}
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
        <TextInput
          value={user.email}
          editable={false}
          style={[styles.input, styles.inputDisabled]}
        />
        <Text style={styles.helperText}>Email cannot be changed</Text>
      </View>

      {/* Change Password Section */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeaderButton}
          onPress={() => setShowPasswordSection(!showPasswordSection)}
        >
          <Text style={styles.sectionHeaderText}>Change Password</Text>
          <Text style={styles.sectionHeaderIcon}>
            {showPasswordSection ? "▼" : "▶"}
          </Text>
        </TouchableOpacity>

        {showPasswordSection && (
          <View style={styles.passwordSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.input}
                placeholder="Enter current password"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholder="Enter new password (min 6 characters)"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm New Password</Text>
              <TextInput
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                style={styles.input}
                placeholder="Re-enter new password"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
              disabled={loading}
            >
              <Text style={styles.changePasswordButtonText}>
                {loading ? "Changing..." : "Change Password"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Clear Bookings Button */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearBookings}
        disabled={loading}
      >
        <Text style={styles.clearButtonText}>Clear Bookings Counter</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Save & Cancel Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.editButton, styles.cancelButtonStyle]}
          onPress={handleCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.editButton, styles.saveButtonStyle]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.editButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Delete Account Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
        disabled={loading}
      >
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}