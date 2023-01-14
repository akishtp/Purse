import { createSlice } from "@reduxjs/toolkit";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "./recordsActions";

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
  extraReducers: (builder) => {
    builder
      .addCase(getRecords.pending, (state) => {
        state.loading = true;
        state.recordError = null;
      })
      .addCase(getRecords.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
      })
      .addCase(getRecords.rejected, (state, { payload }) => {
        state.loading = false;
        state.recordError = payload;
      })
      .addCase(addRecord.pending, (state) => {
        state.loading = true;
        state.addError = null;
      })
      .addCase(addRecord.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
        state.addRecord = false;
      })
      .addCase(addRecord.rejected, (state, { payload }) => {
        state.loading = false;
        state.addError = payload;
      })
      .addCase(deleteRecord.pending, (state) => {
        state.loading = true;
        state.recordError = null;
      })
      .addCase(deleteRecord.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
      })
      .addCase(deleteRecord.rejected, (state, { payload }) => {
        state.loading = false;
        state.recordError = payload;
      })
      .addCase(updateRecord.pending, (state) => {
        state.loading = true;
        state.addError = null;
      })
      .addCase(updateRecord.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
      })
      .addCase(updateRecord.rejected, (state, { payload }) => {
        state.loading = false;
        state.addError = payload;
      });
  },
});

export const { closeAddRecord, openAddRecord } = recordSlice.actions;

export default recordSlice.reducer;
