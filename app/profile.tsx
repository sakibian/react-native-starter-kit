// app/profile.js
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.title}>
        <Text>Back</Text>
      </TouchableOpacity>

      {user ? (
        <>
          {user.photoURL && (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          )}
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
          {user.displayName && (
            <Text style={styles.text}>Name: {user.displayName}</Text>
          )}
        </>
      ) : (
        <Text style={styles.text}>No user information available.</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
});
