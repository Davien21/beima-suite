import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "interfaces";

const initialState: IAuth = {
  isLoggedIn: true,
  user: {
    firstName: "Chidiebere",
    lastName: "Ekennia",
    email: "",
  },
  beimaAuthToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.beimaAuthToken = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<IAuth["user"]>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setUser, setAuthToken } = userSlice.actions;

export default userSlice.reducer;
