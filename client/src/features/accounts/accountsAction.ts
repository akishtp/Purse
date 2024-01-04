import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccounts = createAsyncThunk(
  "accounts/get",
  async (token: string, { rejectWithValue }) => {
    console.log(token);

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
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
