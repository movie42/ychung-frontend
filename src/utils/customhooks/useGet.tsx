import React from "react";
import { useQuery } from "react-query";
import { getRequest } from "../utilities/httpMethod";

interface IFetchProps {
  url: RequestInfo;
  queryKey: string;
}

export const useGet = ({ url, queryKey }: IFetchProps) => {
  return useQuery(
    queryKey,
    async () => {
      const response = await fetch(url, getRequest);
      return await response.json();
    },
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};
