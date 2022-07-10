import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateDocSchema } from "utils";
import { IContract } from "interfaces";
import { addContract } from "./contractSlice";

interface ISliceProps {
  name: string;
  contractData: string[] | null;
  documentation: any | null;
  contractFile: File | null;
  abiFile: File | null;
  abiData: any[] | null;
  step: number;
  activeTab: string;
}

const initialState: ISliceProps = {
  name: "",
  contractData: null,
  contractFile: null,
  abiFile: null,
  documentation: null,
  abiData: null,
  step: 0,
  activeTab: "contract",
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUploadedContractName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setContractFile: (state, action: PayloadAction<File | null>) => {
      const contractFile = action.payload;
      state.contractFile = contractFile;
      if (!contractFile) state.contractData = null;
    },
    setAbiFile: (state, action: PayloadAction<File | null>) => {
      const abiFile = action.payload;
      state.abiFile = abiFile;
      if (!abiFile) state.abiData = null;
    },
    setUploadedContractData: (state, action: PayloadAction<string[]>) => {
      state.contractData = action.payload;
    },
    setUploadedABIData: (state, action: PayloadAction<any[]>) => {
      state.abiData = action.payload;
    },
    setDocumentation: (state) => {
      if (state.contractData && state.abiData) {
        state.documentation = generateDocSchema(
          state.name,
          state.contractData,
          state.abiData
        );
      }
      console.log(state.documentation);
    },
    activateABITab: (state) => {
      state.activeTab = "abi";
    },
    resetUploadState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUploadedContractName,
  setUploadedContractData,
  setContractFile,
  setUploadedABIData,
  setAbiFile,
  setDocumentation,
  activateABITab,
  resetUploadState,
} = uploadSlice.actions;

export default uploadSlice.reducer;
