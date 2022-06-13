import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useFetchToken } from "./useFetchToken";

interface IusePostProps {
  url: RequestInfo;
  queryKey: string;
}

const usePost = ({ url, queryKey }: IusePostProps) => {
  const { csrf, csrfToken } = useFetchToken();
  const queryClient = useQueryClient();

  const postHelper = async (postData: any) => {
    const data = JSON.stringify(postData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: data,
      credentials: "include",
      mode: "cors",
    });
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  return useMutation(postHelper, {
    onSuccess: (data, variables, context) => {
      return queryClient.invalidateQueries(queryKey, { exact: true });
    },
  });
};

export default usePost;
