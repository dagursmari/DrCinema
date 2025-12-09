import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@/src/redux/store';

export default function RootLayout() {
  
  return (
    <StoreProvider store={store}>
    <GestureHandlerRootView>
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        }
        
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
          headerShown: false,
          title: "Home Screen"
        }}
        />

        <Stack.Screen 
        name="signup"
        options={{
          headerShown: false,
          title: "Sign Up"
        }}
        />

        <Stack.Screen 
        name="login"
        options={{
          headerShown: false,
          title: "Login"
        }}
        />

        <Stack.Screen 
        name="cinemas-screen"
        options={{
          headerShown: false,
          title: "Cinemas Screen"
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
          title: "Movie"
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



    </Stack>
    </GestureHandlerRootView>
    </StoreProvider>

  );
}