// app/home.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, Divider, Provider as PaperProvider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Signing out");
      dispatch(clearUser());
      router.replace("/signin");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleProfile = () => {
    closeMenu();
    router.push("/profile");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Home!</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
              <Text style={styles.menuText}>Menu</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={handleProfile} title="Profile" />
          <Divider />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  menuButton: {
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  menuText: { color: "white", fontSize: 16 },
});
