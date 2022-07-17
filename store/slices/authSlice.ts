import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract, IFunction } from "interfaces";

const initialState: IContract[] = [];

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
