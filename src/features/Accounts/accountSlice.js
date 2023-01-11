import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  loading: false,
  accountsError: null,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default accountSlice.reducer;
