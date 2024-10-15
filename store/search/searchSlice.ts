import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchApi from "./searchApi";

// Thunks
export const searchGroupsPostsEvents = createAsyncThunk(
  "search/searchGroupsPostsEvents",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchApi.search(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchGroupsPostsEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchGroupsPostsEvents.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(searchGroupsPostsEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
