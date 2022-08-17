import React from "react";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

import { getRequest } from "@/lib/utils/utils";

interface IFetchProps<T>
  extends Omit<
    UseQueryOptions<T, unknown, T, QueryKey>,
    "queryKey" | "queryFn"
  > {
  url: RequestInfo;
  queryKey: string | string[];
}

export const useGet = <T,>({ url, queryKey, ...rest }: IFetchProps<T>) => {
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
