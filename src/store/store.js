import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { userSlice } from "./userData";
import { viewSlice } from "./currentViews/viewSlice";
import { filterSlice } from "./filters/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userData: userSlice.reducer,
    currentViews: viewSlice.reducer,
    filters: filterSlice.reducer,
  },
});
