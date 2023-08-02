import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import PostsSlice from "./postsSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    posts: PostsSlice.reducer
  },
});
