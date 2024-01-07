import { createSlice } from "@reduxjs/toolkit";
import { getRecords } from "./recordsAction";

interface RecordState {
  ID: number;
  type: string;
  account_name: string;
  amount: string;
  category: string;
  date_time: Date;
  note: string;
  accountID: number;
}

interface RecordsState {
  records: RecordState[] | null;
  loading: boolean;
  error: any;
}

const records = localStorage.getItem("records")
  ? JSON.parse(localStorage.getItem("records") as any)
  : null;

const initialState: RecordsState = {
  records,
  loading: false,
  error: null,
};

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecords.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
      })
      .addCase(getRecords.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default recordsSlice.reducer;
