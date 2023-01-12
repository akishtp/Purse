import { createSlice } from "@reduxjs/toolkit";
import { getAccounts, addAccount } from "./accountActions";

const initialState = {
  accounts: [],
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
  },
});

export const { openAddAccount, closeAddAccount } = accountSlice.actions;

export default accountSlice.reducer;
