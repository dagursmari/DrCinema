import { mainPink, shadow, white } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: white,
  },

  // Title and subtitle
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: mainPink,
    marginBottom: 20,
    textAlign: "center",
  },

  // Profile Image Styles
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 8,
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
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderStyle: "dashed",
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
  inputError: {
    borderColor: "#E94560",
    borderWidth: 2,
  },
  errorText: {
    color: "#E94560",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },

  // Buttons
  editButton: {
    marginTop: 20,
    backgroundColor: mainPink,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 45,
    alignItems: "center",
    shadowColor: mainPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  editButtonText: {
    color: white,
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: white,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 45,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: mainPink,
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButtonText: {
    color: mainPink,
    fontSize: 16,
    fontWeight: "bold",
  },
});
