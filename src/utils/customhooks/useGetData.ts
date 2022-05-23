import React from "react";
import { useQuery } from "react-query";
import { getRequest } from "../utilities/httpMethod";

interface IFetchProps {
  URL: RequestInfo;
  queryKey: string;
}

export const useGetData = ({ URL, queryKey }: IFetchProps) => {
  const { isLoading, isSuccess, error, data } = useQuery(queryKey, async () => {
    const response = await fetch(URL, getRequest);
    return await response.json();
  });

  return { isLoading, isSuccess, error, data };
};
