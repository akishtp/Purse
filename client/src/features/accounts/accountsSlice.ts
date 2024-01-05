import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "./accountsAction";

interface accountState {
  ID: number;
  account_name: string;
  balance: number;
  color: string;
}

interface accountsState {
  accounts: accountState[] | null;
  loading: boolean;
  error: any;
}

const accounts = localStorage.getItem("accounts")
  ? JSON.parse(localStorage.getItem("accounts") as any)
  : null;

const initialState: accountsState = {
  accounts,
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccounts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = payload;
    });
    builder.addCase(getAccounts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default accountsSlice.reducer;
