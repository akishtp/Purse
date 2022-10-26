import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecords = createAsyncThunk(
  "record/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/records/");
      // console.log(data);
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
        "/api/records/",
        { type, account, amount, category, date, payee, note },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
