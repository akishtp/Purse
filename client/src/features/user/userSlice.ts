import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./userActions";

const initialState = {
  userDetails: {},
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
