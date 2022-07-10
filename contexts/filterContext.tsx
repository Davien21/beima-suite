import { IHiddenContractItem } from "interfaces";
import { createContext, useContext, useState } from "react";

const emptyState: IHiddenContractItem[] = [];
type isHiddenContextType = {
  hiddenStates: IHiddenContractItem[];
  sethiddenStates: (data: IHiddenContractItem[]) => void;
};

const isHiddenContextDefaultValues: isHiddenContextType = {
  hiddenStates: emptyState,
  sethiddenStates: () => null,
};

const ContractContext = createContext<isHiddenContextType>(
  isHiddenContextDefaultValues
);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [hiddenStates, sethiddenStates] = useState<IHiddenContractItem[]>(emptyState);
  return (
    <ContractContext.Provider value={{ hiddenStates, sethiddenStates }}>
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
