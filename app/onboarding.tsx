import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const OnboardingScreen = ({}) => {
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("@hasSeenOnboarding", "true");
      console.log("Onboarding status set to true");

      // Read back the value to verify
      const value = await AsyncStorage.getItem("@hasSeenOnboarding");
      if (value !== null) {
        console.log(`Retrieved value: ${value}`); // Should log "Retrieved value: true"
      } else {
        console.log("No value found for @hasSeenOnboarding");
      }

      router.push("/signin");
    } catch (e) {
      console.error("Failed to save onboarding status.", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp!</Text>
      <Text style={styles.text}>This is the onboarding screen.</Text>
      <Button title="Get Started" onPress={completeOnboarding} />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
});
