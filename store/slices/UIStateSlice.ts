import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITypes, IUIStateSlice } from "interfaces";
import { ArrayMinusItem } from "utils/helpers";

const initialState: IUIStateSlice = {
  openContracts: [],
  openedOptionId: "",
};

export const UIStateSlice = createSlice({
  name: "UIState",
  initialState,
  reducers: {
    toggleOpenContract: (state, action: PayloadAction<string>) => {
      const contractId = action.payload;
      const openContracts = state.openContracts;
      if (openContracts.includes(contractId))
        state.openContracts = ArrayMinusItem(openContracts, contractId);
      else state.openContracts.push(contractId);
    },
    setOpenContract: (
      state,
      action: PayloadAction<{ contractId: string; isOpen: true }>
    ) => {
      const { contractId, isOpen } = action.payload;
      const openContracts = state.openContracts;
      if (isOpen) state.openContracts.push(contractId);
      else state.openContracts = ArrayMinusItem(openContracts, contractId);
    },
    setOpenedOptionId: (state, action: PayloadAction<string>) => {
      state.openedOptionId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleOpenContract, setOpenContract, setOpenedOptionId } =
  UIStateSlice.actions;

export default UIStateSlice.reducer;
