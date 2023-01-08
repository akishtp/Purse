import { createSlice } from "@reduxjs/toolkit";
import { addAccount } from "./accountActions";
import { login, signup } from "./userActions";

const userDetails = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const accounts = userDetails ? userDetails.accounts : null;

const initialState = {
  userDetails,
  loading: false,
  error: null,
  accounts,
  addAccount: false,
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
      state.accounts = {};
    },
    closeAddAccount: (state) => {
      console.log("closed");
      state.addAccount = false;
    },
    openAddAccount: (state) => {
      state.addAccount = true;
      state.addError = null;
      console.log("opened");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload;
        state.accounts = payload.accounts;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload;
        state.accounts = payload.accounts;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload;
        state.accounts = payload.accounts;
      })
      .addCase(addAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, openAddAccount, closeAddAccount } = userSlice.actions;

export default userSlice.reducer;
