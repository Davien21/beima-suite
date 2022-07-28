import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract, IFunction } from "interfaces";
import {
  ArrayMinusItem,
  getFunctionById,
  getFunctionIndex,
  getItemById,
} from "utils/helpers";

const initialState: IContract = {
  id: "",
  name: "",
  alias: "",
  data: [],
  description: "",
};

export const contractsSlice = createSlice({
  name: "testContract",
  initialState,
  reducers: {
    setTestContract: (state, action: PayloadAction<IContract>) => {
      Object.assign(state, action.payload);
    },
    toggleTestItemHiddenState: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.data.findIndex((x) => x.id === itemId);
      const item = state.data[index];
      item.isHidden = !item.isHidden;
    },
    toggleLinkTestEvent: (
      state,
      action: PayloadAction<{ functionId: string; event: string }>
    ) => {
      const { functionId, event } = action.payload;
      const item = getFunctionById(state, functionId);

      if (!item.linkedEvents) return;
      if (item.linkedEvents.includes(event))
        item.linkedEvents = ArrayMinusItem(item.linkedEvents, event);
      else item.linkedEvents.push(event);
    },
    setItemDescription: (
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) => {
      const { id, description } = action.payload;
      const item = getItemById(state, id);
      item.description = description;
    },
    setTestContractDesc: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    deleteTestContract(state) {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTestContract,
  toggleTestItemHiddenState,
  toggleLinkTestEvent,
  setItemDescription,
  setTestContractDesc,
  deleteTestContract,
} = contractsSlice.actions;

export default contractsSlice.reducer;
