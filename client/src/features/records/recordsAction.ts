import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecords = createAsyncThunk(
  "records/get",
  async (token: string, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/records",
        config
      );
      localStorage.setItem("records", JSON.stringify(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(JSON.parse(error.request.response).error);
    }
  }
);

export const addRecord = createAsyncThunk(
  "record/add",
  async (
    {
      type,
      accountID,
      account_name,
      amount,
      category,
      date_time,
      note,
      token,
    }: {
      type: string;
      accountID: number;
      account_name: string;
      amount: number;
      category: string;
      date_time: string;
      note: string;
      token: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "http://localhost:8000/api/records",
        { type, accountID, account_name, amount, category, date_time, note },
        config
      );
      await dispatch(getRecords(token));
    } catch (error: any) {
      return rejectWithValue(JSON.parse(error.request.response).error);
    }
  }
);