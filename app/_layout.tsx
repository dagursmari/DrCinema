import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/src/redux/store";

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
          headerShown: true,
          title: "DrCinema"
        }}
        />



    </Stack>
    </GestureHandlerRootView>
    </StoreProvider>

  );
}
