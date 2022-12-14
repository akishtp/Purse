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
      localStorage.setItem("accounts", JSON.stringify(data));
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

export const deleteAccounts = createAsyncThunk(
  "account/delete",
  async ({ _id, token }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `https://verlow-server.up.railway.app/api/accounts/${_id}`,
        config
      );
      dispatch(getAccounts(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "account/update",
  async (
    { name, balance, color, _id, token },
    { rejectWithValue, dispatch }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `https://verlow-server.up.railway.app/api/accounts/${_id}`,
        { name, balance, color },
        config
      );
      dispatch(getAccounts(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
