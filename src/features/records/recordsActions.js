import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecords = createAsyncThunk(
  "record/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://verlow-server.up.railway.app/api/records"
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
    { type, account, amount, category, date, payee, note },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "https://verlow-server.up.railway.app/api/records",
        { type, account, amount, category, date, payee, note },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "record/delete",
  async (_id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.delete(
        `https://verlow-server.up.railway.app/api/records/${_id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
