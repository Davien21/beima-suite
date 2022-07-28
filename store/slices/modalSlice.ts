import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IModals } from "interfaces";

const initialState: IModals = {
  isUploadModalOpen: false,
  isItemDescModalOpen: false,
  isContractDescModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsUploadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isUploadModalOpen = action.payload;
    },
    setIsItemDescModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isItemDescModalOpen = action.payload;
    },
    setIsContractDescModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isContractDescModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsUploadModalOpen,
  setIsItemDescModalOpen,
  setIsContractDescModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
