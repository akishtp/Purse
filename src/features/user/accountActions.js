import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addAccount = createAsyncThunk(
  "accounts/add",
  async ({ accounts, token }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/user/profile",
        { accounts },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
