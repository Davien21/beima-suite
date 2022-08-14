import { IContract } from "interfaces";
import { useEffect } from "react";
import useSWR from "swr";
import { getAuthToken } from "utils/helpers";
import { useContracts } from "./useContracts";

function useItem({
  contractId,
  itemId,
}: {
  contractId: string;
  itemId: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contracts/${contractId}/${itemId}`;
  let fetcher = async () => {
    const res = await fetch(url, {
      headers: { authorization: getAuthToken() },
      method: "GET",
    });
    return await res.json();
  };
  const { data, error, mutate } = useSWR(
    !!getAuthToken() ? `/api/item/${contractId}/${itemId}` : null,
    fetcher
  );
  
  return {
    item: data?.data || null,
    isLoading: !!getAuthToken() && !error && !data,
    isError: error,
    mutate,
  };
}

export { useItem };
