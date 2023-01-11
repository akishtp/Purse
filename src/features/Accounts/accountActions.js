import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAccounts = createAsyncThunk(
  "accounts/get",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "https://verlow-server.up.railway.app/api/accounts",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addAccount = createAsyncThunk("account/add", () => {});
