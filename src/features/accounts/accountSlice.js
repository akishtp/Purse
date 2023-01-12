import { createSlice } from "@reduxjs/toolkit";
import { getAccounts, addAccount, deleteAccounts } from "./accountActions";

const accounts = localStorage.getItem("accounts")
  ? JSON.parse(localStorage.getItem("accounts"))
  : [];

const initialState = {
  accounts,
  loading: false,
  accountsError: null,
  addAccount: false,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    closeAddAccount: (state) => {
      state.addAccount = false;
    },
    openAddAccount: (state) => {
      state.addAccount = true;
      state.accountsError = null;
    },
  },
  extraReducers: (builder) => {
    // get all account
    builder.addCase(getAccounts.pending, (state) => {
      state.loading = true;
      state.accountsError = null;
    });
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = payload;
    });
    builder.addCase(getAccounts.rejected, (state, { payload }) => {
      state.loading = false;
      state.accountsError = payload;
    });
    // add new account
    builder.addCase(addAccount.pending, (state) => {
      state.loading = true;
      state.accountsError = null;
    });
    builder.addCase(addAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts.push(payload);
    });
    builder.addCase(addAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.accountsError = payload;
    });
    // delete account
    builder.addCase(deleteAccounts.pending, (state) => {
      state.loading = true;
      state.accountsError = null;
    });
    builder.addCase(deleteAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.accounts = payload;
    });
    builder.addCase(deleteAccounts.rejected, (state, { payload }) => {
      state.loading = false;
      state.accountsError = payload;
    });
  },
});

export const { openAddAccount, closeAddAccount } = accountSlice.actions;

export default accountSlice.reducer;
