import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  async ({ name, password, email }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/user/signup",
        { name, password, email },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ name, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/user/login",
        { name, password },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
