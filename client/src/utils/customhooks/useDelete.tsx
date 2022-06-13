import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRequest } from "../utilities/httpMethod";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IuseDeleteProps {
  url: RequestInfo;
  queryKey: string;
}

const useDelete = ({ url, queryKey }: IuseDeleteProps) => {
  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const deleteHelper = async () => {
    const response = await fetch(url, deleteRequest(csrfToken));
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  return useMutation(deleteHelper, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey, { exact: true });
    },
  });
};

export default useDelete;
