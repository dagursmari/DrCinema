import { store } from '@/src/redux/store';
import { Stack } from "expo-router";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { loadStoredAuth } from "@/src/redux/slices/auth-slice";
import { useEffect } from "react";

// Component to load auth on app start
function AuthLoader() {
  useEffect(() => {
    // Load stored auth data when app starts
    store.dispatch(loadStoredAuth());
  }, []);

  return null;
}

export default function RootLayout() {
  
  return (
    <StoreProvider store={store}>
    <AuthLoader />
    <GestureHandlerRootView>
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
          style={{width:184, height:60}}/>
        )
        
      }}>

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
        }}
        />

        <Stack.Screen 
        name="login"
        options={{
          headerShown: true,
          title: "Login",
          headerBackVisible: false,
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
          headerShown:true,
          title: "Favourites",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
        />


    </Stack>
    </GestureHandlerRootView>
    </StoreProvider>

  );
}