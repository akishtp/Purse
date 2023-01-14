import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccounts } from "../accounts/accountActions";

export const getRecords = createAsyncThunk(
  "record/get",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "https://verlow-server.up.railway.app/api/records",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addRecord = createAsyncThunk(
  "record/add",
  async (
    { type, account, amount, category, date, payee, note, token },
    { rejectWithValue, dispatch }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/records",
        { type, account, amount, category, date, payee, note },
        config
      );
      dispatch(getAccounts(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "record/delete",
  async ({ _id, token }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `https://verlow-server.up.railway.app/api/records/${_id}`,
        config
      );
      dispatch(getAccounts(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateRecord = createAsyncThunk(
  "record/update",
  async (
    { _id, type, account, amount, category, date, payee, note, token },
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
        `https://verlow-server.up.railway.app/api/records/${_id}`,
        { type, account, amount, category, date, payee, note },
        config
      );
      dispatch(getAccounts(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
