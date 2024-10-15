// app/signin.js
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const resetOnboarding = async () => {
    try {
      const response = await AsyncStorage.removeItem("@hasSeenOnboarding");
      console.log(response);
      router.replace("/onboarding");
    } catch (e) {
      console.error("Failed to reset onboarding status.");
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
      router.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Reset Onboarding" onPress={resetOnboarding} />
      <Text style={styles.text} onPress={() => router.push("/register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  text: { marginTop: 20, textAlign: "center", color: "blue" },
});
