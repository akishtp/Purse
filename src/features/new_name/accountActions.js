import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { closeAddAccount } from "./accountSlice";

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

export const addAccount = createAsyncThunk(
  "accounts/add",
  async ({ name, balance, color, token }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/accounts",
        { name, balance, color },
        config
      );
      dispatch(closeAddAccount());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
