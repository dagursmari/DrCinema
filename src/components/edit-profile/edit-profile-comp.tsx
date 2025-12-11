import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updateUserProfile } from "@/src/redux/slices/auth-slice";
import * as Camera from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export function EditProfileComp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || !user) return null;

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const { status } = await Camera.useCameraPermissions();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
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
      router.back(); // navigate back after saving
    } catch (error: any) {
      Alert.alert("Error", error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Picker */}
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

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={user.email} editable={false} style={styles.input} />
      </View>

      {/* Save & Cancel Buttons Inline */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: "#888", flex: 1, marginRight: 10 }]}
          onPress={handleCancel}
          disabled={loading}
        >
          <Text style={styles.editButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.editButton, { flex: 1, marginLeft: 10 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.editButtonText}>{loading ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
