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
  _id: "",
  name: "",
  alias: "",
  data: [],
  description: "",
  preview_id: "",
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
      const index = state.data.findIndex((x) => x._id === itemId);
      const item = state.data[index];
      item.isHidden = !item.isHidden;
    },
    toggleLinkTestEvent: (
      state,
      action: PayloadAction<{ itemId: string; event: string }>
    ) => {
      const { itemId, event } = action.payload;
      const item = getFunctionById(state, itemId);
      if (!item.linkedEvents) return;
      if (item.linkedEvents.includes(event))
        item.linkedEvents = ArrayMinusItem(item.linkedEvents, event);
      else item.linkedEvents.push(event);
    },
    setItemDescription: (
      state,
      action: PayloadAction<{ _id: string; description: string }>
    ) => {
      const { _id, description } = action.payload;
      const item = getItemById(state, _id);
      if (item) item.description = description;
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
