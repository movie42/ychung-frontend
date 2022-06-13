import React from "react";
import { useQuery } from "react-query";
import { SetterOrUpdater } from "recoil";
import { getRequest } from "../utilities/httpMethod";

interface IFetchProps<T> {
  url: RequestInfo;
  queryKey: string;
}

export const useGet = <T,>({ url, queryKey }: IFetchProps<T>) => {
  return useQuery<T>(
    queryKey,
    async () => {
      const response = await fetch(url, getRequest);
      const { data } = await response.json();
      return data;
    },
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};
