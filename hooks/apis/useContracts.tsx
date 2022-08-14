import { IContract } from "interfaces";
import { useEffect } from "react";
import useSWR from "swr";
import { getAuthToken } from "utils/helpers";

const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contracts`;

let fetcher = async () => {
  const res = await fetch(url, {
    headers: { authorization: getAuthToken() },
    method: "GET",
  });
  return await res.json();
};
function useContracts() {
  const { data, error, mutate } = useSWR(
    !!getAuthToken() ? "/api/contracts" : null,
    fetcher
  );

  return {
    contracts: (data?.data as IContract[]) || null,
    isLoading: !!getAuthToken() && !error && !data,
    isError: error,
    mutate,
  };
}

export { useContracts };
