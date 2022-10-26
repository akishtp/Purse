import { createSlice } from "@reduxjs/toolkit";
import { getRecords } from "./recordsActions";

const initialState = {
  records: [],
  loading: false,
  error: null,
  addRecord: false,
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    closeAddRecord: (state) => {
      state.addRecord = false;
    },
    openAddRecord: (state) => {
      state.addRecord = true;
    },
  },
  extraReducers: {
    [getRecords.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRecords.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.records = payload;
    },
    [getRecords.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { closeAddRecord, openAddRecord } = recordSlice.actions;

export default recordSlice.reducer;
