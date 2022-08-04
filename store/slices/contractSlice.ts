import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContract } from "interfaces";

const initialState: IContract[] = [];

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setContracts: (state, action: PayloadAction<IContract[]>) => {
      const data = action.payload;
      Object.assign(state, cleanContracts(data));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContracts } = contractsSlice.actions;

export default contractsSlice.reducer;

const cleanContracts = (contracts: IContract[]) => {
  contracts = contracts.map((contract) => {
    return {
      _id: contract._id,
      creator_id: contract.creator_id,
      name: contract.name,
      alias: contract.alias,
      data: contract.data,
      description: contract.description,
    };
  }) as unknown as IContract[];
  return contracts;
};
