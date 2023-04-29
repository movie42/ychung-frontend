import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGroup = () => {
  const queryclient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<unknown, AxiosError, { id: string }>(
    ({ id }) => api.deleteData(`/api/education/group/${id}`),
    {
      onSuccess: () => {
        queryclient.invalidateQueries(["groups"]);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useDeleteGroup;
