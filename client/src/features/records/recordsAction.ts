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
      console.log(error);
      return rejectWithValue(JSON.parse(error.request.response).error);
    }
  }
);
