import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "./accountActions";

const initialState = {
  accounts: [],
  loading: false,
  accountsError: null,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
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
  },
});

export default accountSlice.reducer;
