import { createSlice } from "@reduxjs/toolkit";
import { addRecord, getRecords } from "./recordsActions";

const initialState = {
  records: [],
  loading: false,
  recordError: null,
  addError: null,
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
      state.addError = null;
    },
  },
  extraReducers: {
    [getRecords.pending]: (state) => {
      state.loading = true;
      state.recordError = null;
    },
    [getRecords.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.records = payload;
    },
    [getRecords.rejected]: (state, { payload }) => {
      state.loading = false;
      state.recordError = payload;
    },
    [addRecord.pending]: (state) => {
      state.loading = true;
      state.addError = null;
    },
    [addRecord.fulfilled]: (state) => {
      state.loading = false;
    },
    [addRecord.rejected]: (state, { payload }) => {
      state.loading = false;
      state.addError = payload;
    },
  },
});

export const { closeAddRecord, openAddRecord } = recordSlice.actions;

export default recordSlice.reducer;
