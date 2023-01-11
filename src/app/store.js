import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recordReducer from "../features/records/recordsSlice";
import accountReducer from "../features/accounts/accountSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordReducer,
    accounts: accountReducer,
  },
});

export default store;
