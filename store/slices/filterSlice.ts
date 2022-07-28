import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITypes, IFiltersSlice } from "interfaces";

const initialState: IFiltersSlice = {
  meta: [],
  showInherited: {
    function: true,
    event: true,
  },
  activeControl: "function",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveControl: (state, action: PayloadAction<ITypes>) => {
      state.activeControl = action.payload;
    },
    toggleInherited: (state) => {
      const type = state.activeControl;
      state.showInherited[type] = !state.showInherited[type];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveControl, toggleInherited } = filterSlice.actions;

export default filterSlice.reducer;
