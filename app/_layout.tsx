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



    </Stack>
    </GestureHandlerRootView>

  );
}
