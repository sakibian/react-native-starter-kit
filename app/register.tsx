// app/register.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useRouter } from "expo-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.text} onPress={() => router.push("/signin")}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

export default Register;

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
