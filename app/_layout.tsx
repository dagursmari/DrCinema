import { store } from '@/src/redux/store';
import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { loadStoredAuth } from "@/src/redux/slices/auth-slice";
import { useEffect } from "react";
import { useAppSelector } from "@/src/redux/hooks";

// Component to load auth on app start
function AuthLoader() {
  useEffect(() => {
    // Load stored auth data when app starts
    store.dispatch(loadStoredAuth());
  }, []);

  return null;
}

// User Profile Button Component
function UserProfileButton() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return null; // Don't show button if not logged in
  }

  return (
    <TouchableOpacity
      onPress={() => router.push("/user-detail")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E94560",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
      activeOpacity={0.7}
    >
      {user.profileImage ? (
        <Image
          source={{ uri: user.profileImage }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#E94560",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
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
            style={{ width: 184, height: 60 }}
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
          headerShown: true,
          title: "Sign Up",
          headerBackVisible: false,
          headerRight: () => null, // Hide on signup screen
        }}
      />

      <Stack.Screen 
        name="login"
        options={{
          headerShown: true,
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
        name="user-detail"
        options={{
          headerShown: true,
          title: "Profile",
          headerBackVisible: true,
          headerRight: () => null, // Hide on user detail screen (already on profile)
        }}
      />
    </Stack>
  );
}

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