import { deleteCookie } from "cookies-next";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { getAuthToken } from "utils/helpers";

const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/me`;

let fetcher = async () => {
  const res = await fetch(url, {
    headers: { authorization: getAuthToken() },
    method: "POST", //switch to GET on backend
  });
  return await res.json();
};
function useUser() {
  const { data, error, mutate } = useSWR(
    !!getAuthToken() ? "/api/user" : null,
    fetcher
  );

  return {
    user: data?.data || null,
    isLoading: !!getAuthToken() && !error && !data,
    isError: error,
    mutate,
    apiMessage: data?.message || null,
  };
}

export { useUser };
