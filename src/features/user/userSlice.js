import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./userActions";

const userDetails = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const initialState = {
  userDetails,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userDetails");
      state.loading = false;
      state.userDetails = null;
      state.error = null;
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
    },
    [signup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
