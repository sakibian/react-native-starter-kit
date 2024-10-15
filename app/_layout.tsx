// app/layout.js
import React, { useEffect } from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import store from "../store/store";
import { setUser, clearUser } from "../store/authSlice";
import { auth } from "../firebaseConfig";
import { Slot } from "expo-router";

const RootLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user)); // setUser now serializes the user data
        router.replace("/home");
      } else {
        dispatch(clearUser());
        router.replace("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
};

export default function LayoutWrapper() {
  return (
    <ReduxProvider store={store}>
      <RootLayout />
    </ReduxProvider>
  );
}
