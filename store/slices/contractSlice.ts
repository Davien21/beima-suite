import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract, IFunction } from "interfaces";

const initialState: IContract[] = [];

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    changeName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
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

    addContract: (state, action: PayloadAction<IContract>) => {
      state.push(action.payload);
    },
    deleteContract: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    setLinkFunctionToEvent: (
      state,
      action: PayloadAction<{
        contractIndex: number;
        functionName: string;
        eventName: string;
        shouldLink?: boolean;
      }>
    ) => {
      const { contractIndex, functionName, eventName, shouldLink } =
        action.payload;
      const functions = state[contractIndex].data;
      const fIndex = functions.findIndex((x) => {
        return x.name === functionName && x.type === "function";
      });
      let linkedEvents = (state[contractIndex].data[fIndex] as IFunction)
        .linkedEvents;
      if (shouldLink === undefined) {
        if (linkedEvents.includes(eventName)) {
          linkedEvents = linkedEvents.filter((x) => x !== eventName);
        } else {
          linkedEvents.push(eventName);
        }
      } else {
        if (shouldLink) {
          linkedEvents.push(eventName);
        } else {
          linkedEvents = linkedEvents.filter((x) => x !== eventName);
        }
      }

      (state[contractIndex].data[fIndex] as IFunction).linkedEvents =
        linkedEvents;
    },
    setFunctionDescription: (
      state,
      action: PayloadAction<{
        index: number;
        functionName: string;
        description: string;
      }>
    ) => {
      const { index, functionName, description } = action.payload;

      const functions = state[index].data;
      const fIndex = functions.findIndex((x) => x.name === functionName);
      state[index].data[fIndex].description = description;
    },
    setContractDescription: (
      state,
      action: PayloadAction<{ index: number; description: string }>
    ) => {
      const { index, description } = action.payload;
      state[index].description = description;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeName,
  toggleHiddenItem,
  addContract,
  deleteContract,
  setContractDescription,
  setLinkFunctionToEvent,
  setFunctionDescription,
} = contractsSlice.actions;

export default contractsSlice.reducer;
