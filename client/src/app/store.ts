import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import accountsReducer from "../features/accounts/accountsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
