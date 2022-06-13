import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postRequest } from "../utilities/httpMethod";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IusePostProps {
  url: RequestInfo;
  queryKey: string;
}

const usePost = ({ url, queryKey }: IusePostProps) => {
  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const postHelper = async (postData: any) => {
    const response = await fetch(url, postRequest(postData, csrfToken));
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  return useMutation(postHelper, {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKey, { exact: true });
    },
  });
};

export default usePost;
