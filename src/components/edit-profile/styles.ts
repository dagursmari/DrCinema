import { mainPink, shadow, white } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: white,
  },

  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: white,
  },

  // Profile Image Styles
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  profileImageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 3,
    borderColor: mainPink,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageIcon: {
    fontSize: 40,
    marginBottom: 4,
  },
  profileImageText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  changePhotoText: {
    fontSize: 14,
    color: mainPink,
    fontWeight: "600",
  },

  // Input Fields
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a1a",
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputDisabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    marginLeft: 5,
  },

  // Section (Change Password)
  sectionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  sectionHeaderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  sectionHeaderIcon: {
    fontSize: 14,
    color: mainPink,
  },
  passwordSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fafafa",
    borderRadius: 12,
  },
  changePasswordButton: {
    backgroundColor: mainPink,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  changePasswordButtonText: {
    color: white,
    fontSize: 14,
    fontWeight: "bold",
  },

  // Divider
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 20,
  },

  // Clear Buttons
  clearButton: {
    width: "100%",
    backgroundColor: white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#FFA500",
  },
  clearButtonText: {
    color: "#FFA500",
    fontSize: 15,
    fontWeight: "bold",
  },

  // Save & Cancel Buttons
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    gap: 12,
  },
  editButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  saveButtonStyle: {
    backgroundColor: mainPink,
    shadowColor: mainPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cancelButtonStyle: {
    backgroundColor: white,
    borderWidth: 2,
    borderColor: "#888",
  },
  editButtonText: {
    color: white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Delete Account Button
  deleteButton: {
    width: "100%",
    backgroundColor: white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#FF4444",
  },
  deleteButtonText: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});