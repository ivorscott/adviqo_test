import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { idle, pending, failed, succeeded } from "../../shared/constants";

const initialState = {
  entities: [],
  loading: idle,
};

export const fetchAdvisors = createAsyncThunk("advisors/fetchAll", async () => {
  const response = await fetch("http://localhost:4000/advisors");
  return await response.json();
});

const advisorsSlice = createSlice({
  name: "advisors",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchAdvisors.pending, (state) => {
      state.loading = pending;
    });
    addCase(fetchAdvisors.fulfilled, (state, action) => {
      state.loading = succeeded;
      state.entities = action.payload;
    });
    addCase(fetchAdvisors.rejected, (state) => {
      state.loading = failed;
      state.entities = [];
    });
  },
});

export const { actions, reducer } = advisorsSlice;
