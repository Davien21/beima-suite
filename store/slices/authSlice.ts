import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "interfaces";

const initialState: IAuth = {
  isLoggedIn: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    isActive: false,
    role: "user"
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth["user"]>) => {
      state.user = action.payload;
    },
    triggerLogout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, triggerLogout } = userSlice.actions;

export default userSlice.reducer;
