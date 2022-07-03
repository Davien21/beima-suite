import { createContext, useContext, useState } from "react";

export interface IContractData {
  functions: any[];
  events: any[];
}
const emptyState: IContractData = { functions: [], events: [] };
type appContextType = {
  contractData: IContractData;
  ABIData: IContractData;
  setcontractData: (data: IContractData) => void;
  setABIData: (data: IContractData) => void;
};

const appContextDefaultValues: appContextType = {
  contractData: emptyState,
  ABIData: emptyState,
  setcontractData: () => null,
  setABIData: () => null,
};

const AppContext = createContext<appContextType>(appContextDefaultValues);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [contractData, setcontractData] = useState<IContractData>(emptyState);
  const [ABIData, setABIData] = useState<IContractData>(emptyState);
  return (
    <AppContext.Provider
      value={{ ABIData, setABIData, contractData, setcontractData }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside a `AppProvider`");

  return context;
}
