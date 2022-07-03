import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "../hooks/useData";
import { useRouter } from "next/router";
import httpService from "../services/httpService";

const dataContext = createContext();

export function DataProvider({ children }) {
  const [fallbackData, setfallbackData] = useState(null);

  const { mutate, allData, isLoading, isError, isEmpty } = useData(fallbackData);

  return (
    <dataContext.Provider
      value={{
        allData: allData?.data,
        isLoading,
        isError,
        isEmpty,
        mutate,
        setfallbackData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(dataContext);

  if (!context) throw new Error("useData must be used inside a `DataProvider`");

  return context;
}
