import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetcher(endpoint: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/${endpoint}`, fetcher);

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
