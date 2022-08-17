import React from "react";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

import { getRequest } from "@/lib/utils";

interface IFetchProps<T>
  extends Omit<
    UseQueryOptions<T, unknown, T, QueryKey>,
    "queryKey" | "queryFn"
  > {
  url: RequestInfo;
  queryKey: string | string[];
}

const useGet = <T,>({ url, queryKey, ...rest }: IFetchProps<T>) => {
  return useQuery<T>(
    queryKey,
    async () => {
      const response = await fetch(url, getRequest);
      const { data } = await response.json();
      return data;
    },
    {
      ...rest,
    }
  );
};
export default useGet;
