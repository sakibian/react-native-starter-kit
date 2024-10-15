// App.js
import { registerRootComponent } from "expo";
import { Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./onboarding";
import SignInScreen from "./signin";
const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("@hasSeenOnboarding");
        if (value !== null) {
          setHasSeenOnboarding(true);
        }
      } catch (e) {
        console.error("Failed to load onboarding status.");
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View>
        <Slot />
      </View>
      <Stack.Navigator>
        {!hasSeenOnboarding ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  );
}

registerRootComponent(App);
