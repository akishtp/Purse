import { createSlice } from "@reduxjs/toolkit";
import { addAccount, getAccounts } from "./accountsAction";

interface accountState {
  ID: number;
  account_name: string;
  balance: number;
  color: string;
}

interface accountsState {
  accounts: accountState[];
  loading: boolean;
  error: any;
}

const initialState: accountsState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      const { amount, type, id } = action.payload;
      let account = state.accounts.find((account) => account.ID === id);

      if (account) {
        if (type === "Expense") account.balance = account.balance - amount;
        else if (type === "Income")
          account.balance = Number(account.balance) + Number(amount);
      }
    },
  },
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
    // add new account
    builder.addCase(addAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = payload;
    });
    builder.addCase(addAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { updateBalance } = accountsSlice.actions;
export default accountsSlice.reducer;
