import useSWR from "swr";
import { getAuthToken } from "utils/helpers";

const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contracts`;
let fetcher = async () => {
  const res = await fetch(url, {
    headers: { authorization: getAuthToken() },
    method: "GET", //switch to GET on backend
  });
  return await res.json();
};
function useRouteList() {
  const { data, error } = useSWR('/api/routes', fetcher);
  
  return {
    routes: data?.data || null,
    isLoading: !!getAuthToken() && !error && !data,
    isError: error,
  };
}

export { useRouteList };
