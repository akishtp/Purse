import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recordReducer from "../features/records/recordsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordReducer,
  },
});

export default store;
