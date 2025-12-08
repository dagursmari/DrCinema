import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  
  return (
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
          headerShown: true,
          title: "DrCinema"
        }}
        />

        <Stack.Screen 
        name="home-screen"
        options={{
          headerShown: true,
          title: "Home Screen"
        }}
        />

        <Stack.Screen 
        name="Signup"
        options={{
          headerShown: true,
          title: "Signup Screen"
        }}
        />

        <Stack.Screen 
        name="Login"
        options={{
          headerShown: true,
          title: "Login Screen"
        }}
        />

        <Stack.Screen 
        name="cinemas-screen"
        options={{
          headerShown: true,
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



    </Stack>
    </GestureHandlerRootView>

  );
}
