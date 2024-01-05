import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccounts } from "../accounts/accountsAction";

export const signup = createAsyncThunk(
  "user/signup",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue, dispatch }
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
      dispatch(getAccounts(data.jwt));
      return data;
    } catch (error: any) {
      return rejectWithValue(JSON.parse(error.request.response).error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue, dispatch }
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
      await dispatch(getAccounts(data.jwt));
      localStorage.setItem("userDetails", JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(JSON.parse(error.request.response).error);
    }
  }
);
