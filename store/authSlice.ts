// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores only serializable user data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, email, displayName, photoURL } = action.payload;
      state.user = { uid, email, displayName, photoURL };
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
