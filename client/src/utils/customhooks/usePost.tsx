import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postOrPatchRequest } from "../utilities/httpMethod";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IusePostProps {
  url: RequestInfo;
  queryKey: string;
  method: "POST" | "PATCH";
}

const usePostOrPatch = <TData, TError, TVariables>({
  url,
  queryKey,
  method,
}: IusePostProps) => {
  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const postHelper = async (postData: TVariables): Promise<TData> => {
    const response = await fetch(
      url,
      postOrPatchRequest(postData, csrfToken, method)
    );
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  return useMutation<TData, TError, TVariables, unknown>(postHelper, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default usePostOrPatch;
