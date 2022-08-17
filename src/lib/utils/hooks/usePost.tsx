import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postOrPatchRequest } from "@/lib/utils/utils";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IusePostProps {
  url: RequestInfo;
  queryKey: string | string[];
  method: "POST" | "PATCH";
}

const usePostOrPatch = <TData, TError, TVariables>({
  url,
  queryKey,
  method,
}: IusePostProps) => {
  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const postHelper = async (postData: TVariables) => {
    const response = await fetch(
      url,
      postOrPatchRequest(postData, csrfToken, method)
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
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
