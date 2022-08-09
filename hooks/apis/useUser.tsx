import useSWR from "swr";
import { getAuthToken } from "utils/helpers";

const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/me`;
let fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: { authorization: getAuthToken() },
    method: "POST", //switch to GET on backend
  });
  return await res.json();
};
function useUser() {
  const { data, error } = useSWR(url, fetcher);

  return {
    user: data?.data || null,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser };
