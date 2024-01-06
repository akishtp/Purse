import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccounts = createAsyncThunk(
  "accounts/get",
  async (token: string, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/accounts",
        config
      );
      localStorage.setItem("accounts", JSON.stringify(data.data));
      return data.data;
    } catch (error: any) {
      console.log(error.request.response);
      return rejectWithValue(error.request.response);
    }
  }
);

export const addAccount = createAsyncThunk(
  "accounts/create",
  async (
    {
      account_name,
      balance,
      color,
      token,
    }: { account_name: string; balance: number; color: string; token: string },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const strBalance = String(balance);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/accounts",
        { account_name, balance: strBalance, color },
        config
      );
      let existingAccounts = JSON.parse(
        localStorage.getItem("accounts") as any
      );
      existingAccounts.push(data);
      localStorage.setItem("accounts", JSON.stringify(existingAccounts));

      return existingAccounts;
    } catch (error: any) {
      console.log(error.request.response);
      return rejectWithValue(error.request.response);
    }
  }
);
