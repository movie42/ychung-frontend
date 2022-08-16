import React, { useEffect, useState } from "react";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { deleteRequest } from "../utilities/httpMethod";
import { useGetCSRFToken } from "./useGetCSRFToken";

interface IuseDeleteProps<T>
  extends Omit<UseMutationOptions<T, unknown, void, unknown>, "mutationFn"> {
  url: RequestInfo;
  queryKey: string;
}

const useDelete = <T,>({ url, queryKey, ...rest }: IuseDeleteProps<T>) => {
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { csrf, csrfToken } = useGetCSRFToken();

  const deleteHelper = async () => {
    const response = await fetch(url, deleteRequest(csrfToken));
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  const mutation = useMutation<T>(deleteHelper, { ...rest });

  return {
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
    ...mutation,
  };
};

export default useDelete;
