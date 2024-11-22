import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationFilters: {},
  seafarerFilters: {},
};

export const filterSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateApplicationFilters: (state, { payload }) => {
      state.applicationFilters = payload;
    },
    updateSeafarerFilters: (state, { payload }) => {
      state.seafarerFilters = payload;
    },
  },
});

export const { updateApplicationFilters, updateSeafarerFilters } =
  filterSlice.actions;
