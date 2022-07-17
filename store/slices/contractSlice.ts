import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract, IFunction } from "interfaces";
import { number, string } from "yup";

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
    toggleInheritedSwitch: (
      state,
      action: PayloadAction<{ type: "function" | "event"; index: number }>
    ) => {
      const { type, index } = action.payload;
      state[index].showInherited[type] = !state[index].showInherited[type];
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
    setFunctionComment: (
      state,
      action: PayloadAction<{
        index: number;
        functionName: string;
        comment: string;
      }>
    ) => {
      const { index, functionName, comment } = action.payload;

      const functions = state[index].data;
      const fIndex = functions.findIndex((x) => x.name === functionName);
      state[index].data[fIndex].comment = comment;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeName,
  toggleHiddenItem,
  addContract,
  deleteContract,
  toggleShowInherited,
  toggleInheritedSwitch,
  setLinkFunctionToEvent,
  setFunctionComment,
} = contractsSlice.actions;

export default contractsSlice.reducer;
