import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFunction, IEvent, IContract } from "interfaces";
import { sampleContractData } from "data/samples";

const initialState: IContract[] = [];

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    changeName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      console.log(state, action);
      const { id, name } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      state[index].alias = name;
    },
    toggleHiddenItem: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      const contractIndex = state.findIndex((item) => item.id === id);
      const functionIndex = state[contractIndex].data.findIndex(
        (item) => item.name === name
      );
      state[contractIndex].data[functionIndex].isHidden =
        !state[contractIndex].data[functionIndex].isHidden;
    },
    addContract: (state, action: PayloadAction<IContract>) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeName, toggleHiddenItem, addContract } =
  contractsSlice.actions;

export default contractsSlice.reducer;
