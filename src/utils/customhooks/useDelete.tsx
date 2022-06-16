import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRequest } from "../utilities/httpMethod";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IuseDeleteProps {
  url: RequestInfo;
  queryKey: string;
}

const useDelete = ({ url, queryKey }: IuseDeleteProps) => {
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const deleteHelper = async () => {
    const response = await fetch(url, deleteRequest(csrfToken));
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  const mutation = useMutation(deleteHelper, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey, { exact: true });
    },
  });

  return {
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
    ...mutation,
  };
};

export default useDelete;
