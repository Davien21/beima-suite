import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IModals } from "interfaces";

const initialState: IModals = {
  isUploadModalOpen: false,
  isFunctionDescModalOpen: false,
  isContractDescModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsUploadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isUploadModalOpen = action.payload;
    },
    setIsFunctionDescModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isFunctionDescModalOpen = action.payload;
    },
    setIsContractDescModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isContractDescModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsUploadModalOpen,
  setIsFunctionDescModalOpen,
  setIsContractDescModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
