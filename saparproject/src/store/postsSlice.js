import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${endpoint}/posts?_page=${page}&_limit=${limit}&_expand=user`
      );

      if (!response.ok) {
        throw new Error("Server error!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    },
  },
});

export default PostsSlice;
