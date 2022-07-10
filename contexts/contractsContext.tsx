import { sampleContractData } from "data/samples";
import { IContract } from "interfaces";
import { createContext, useContext, useState } from "react";

const emptyState: IContract[] = sampleContractData
type contractContextType = {
  allContracts: IContract[];
  setallContracts: (data: IContract[]) => void;
};

const contractContextDefaultValues: contractContextType = {
  allContracts: emptyState,
  setallContracts: () => null,
};

const ContractContext = createContext<contractContextType>(
  contractContextDefaultValues
);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [allContracts, setallContracts] = useState<IContract[]>(emptyState);
  return (
    <ContractContext.Provider value={{ allContracts, setallContracts }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContractContext() {
  const context = useContext(ContractContext);

  if (!context)
    throw new Error("useContract must be used inside a `ContractProvider`");

  return context;
}
