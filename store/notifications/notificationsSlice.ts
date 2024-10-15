import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationsApi from "./notificationsApi";

// Thunks
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationsApi.getAllNotifications();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
