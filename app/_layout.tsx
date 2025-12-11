import { useAppSelector } from "@/src/redux/hooks";
import { loadStoredAuth } from "@/src/redux/slices/auth-slice";
import { store } from '@/src/redux/store';
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";

// Component to load auth on app start
function AuthLoader() {
  useEffect(() => {
    // Load stored auth data when app starts
    store.dispatch(loadStoredAuth());
  }, []);

  return null;
}

// User Profile Button Component (shows for both logged in and guest users)
function UserProfileButton() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handlePress = () => {
    if (isAuthenticated && user) {
      // User is logged in -> go to profile
      router.push("/user-detail");
    } else {
      // Guest user -> go to login
      router.push("/login");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.profileButton}
      activeOpacity={0.7}
    >
      {isAuthenticated && user ? (
        // Logged in user: Show profile image or initial
        user.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileLetter}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )
      ) : (
        // Guest user: Show guest icon
        <View style={styles.guestIcon}>
          <Text style={styles.guestIconText}>👤</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Stack Navigator with Header Right
function AppStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitle: () => (
          <Image
            source={require("@/assets/images/DrCinemaLogo.png")}
            style={{ width: 140, height: 60 }}
          />
        ),
        // Add user button to all screens by default
        headerRight: () => <UserProfileButton />,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
          title: "DrCinema"
        }}
      />

      <Stack.Screen 
        name="home-screen"
        options={{
          headerShown: true,
          title: "Home Screen",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen 
        name="signup"
        options={{
          headerShown: false,
          title: "Sign Up",
          headerBackVisible: false,
          headerRight: () => null, // Hide on signup screen
        }}
      />

      <Stack.Screen 
        name="login"
        options={{
          headerShown: false,
          title: "Login",
          headerBackVisible: false,
          headerRight: () => null, // Hide on login screen
        }}
      />

      <Stack.Screen 
        name="cinemas-screen"
        options={{
          headerShown: true,
          title: "Cinemas Screen",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen 
        name="cinema-details"
        options={{
          headerShown: true,
          title: "Cinema Details"
        }}
      />

      <Stack.Screen 
        name="movie-screen"
        options={{
          headerShown: true,
          title: "Movie",
          headerBackVisible: false,
        }}
      />

      <Stack.Screen 
        name="test-movie"
        options={{
          headerShown: true,
          title: "Test"
        }}
      />

      <Stack.Screen 
        name="test-auth"
        options={{
          headerShown: true,
          title: "Test Auth"
        }}
      />

      <Stack.Screen 
        name="upcoming-screen"
        options={{
          headerShown: true,
          title: "Upcoming Movies",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="favourites"
        options={{
          headerShown: true,
          title: "Favourites",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: true,
          title: "Edit Profile",
          headerBackVisible: true,
          gestureEnabled: false,
          headerRight: () => null,
        }}
      />

      <Stack.Screen
        name="user-detail"
        options={{
          headerShown: true,
          title: "Profile",
          headerBackVisible: false,
          headerRight: () => null, // Hide on user detail screen (already on profile)
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    marginRight: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E94560',
  },
  profilePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E94560',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileLetter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
  },
  guestIconText: {
    fontSize: 20,
  },
});

export default function RootLayout() {
  return (
    <StoreProvider store={store}>
      <AuthLoader />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppStack />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}