import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract, IFunction } from "interfaces";

const initialState: IContract[] = [];

export const authSlice = createSlice({
  name: "auth",
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
  setLinkFunctionToEvent,
} = authSlice.actions;

export default authSlice.reducer;
