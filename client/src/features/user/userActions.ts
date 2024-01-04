import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "user/signup",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/signup",
        { name, password },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error: any) {
      console.log(error.request.response);
      return rejectWithValue({ error: "error" });
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/login",
        { name, password },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("hello");
    }
  }
);
