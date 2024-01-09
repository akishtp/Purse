import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./userActions";

interface userState {
  userDetails: { name: string; accounts: string[]; jwt: string } | null;
  loading: boolean;
  error: any;
}

const userDetails = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails") as any)
  : null;

const initialState: userState = {
  userDetails: userDetails,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("accounts");
      localStorage.removeItem("records");
      state.loading = false;
      state.error = false;
      state.userDetails = null;
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
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
