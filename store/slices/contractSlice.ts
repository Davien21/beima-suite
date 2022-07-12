import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract } from "interfaces";

const initialState: IContract[] = [];

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    toggleShowInherited: (
      state,
      action: PayloadAction<{ type: string; index: number; name: string }>
    ) => {
      const { index, type } = action.payload;
      const functions = state[index].data.map((item: any) => {
        if (type === item.type && item.isNative === false)
          item.isHidden = !item.isHidden;
        return item;
      });
      state[index].data = functions;
    },
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
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      const { index, name } = action.payload;
      const functions = state[index].data;
      const fIndex = functions.findIndex((x) => x.name === name);
      state[index].data[fIndex].isHidden = !state[index].data[fIndex].isHidden;
    },
    toggleContractOpen: (state, action: PayloadAction<number>) => {
      state[action.payload].isOpen = !state[action.payload].isOpen;
    },
    toggleInheritedSwitch: (
      state,
      action: PayloadAction<{ type: "function" | "event"; index: number }>
    ) => {
      const { type, index } = action.payload;
      state[index].showInherited[type] = !state[index].showInherited[type];
    },
    toggleActiveControl: (
      state,
      action: PayloadAction<{ control: "function" | "event"; index: number }>
    ) => {
      const { control, index } = action.payload;
      state[index].activeControl = control;
    },
    addContract: (state, action: PayloadAction<IContract>) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeName,
  toggleHiddenItem,
  addContract,
  toggleShowInherited,
  toggleContractOpen,
  toggleInheritedSwitch,
  toggleActiveControl,
} = contractsSlice.actions;

export default contractsSlice.reducer;
