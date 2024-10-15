import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postApi from "./postApi";

// Thunks
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.getAllPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    createPost(state, action) {
      state.posts.push(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { createPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
