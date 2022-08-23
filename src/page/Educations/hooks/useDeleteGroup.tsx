import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

const useDeleteGroup = () => {
  const queryclient = useQueryClient();
  return useMutation<unknown, AxiosError, { id: string }>(
    ({ id }) => api.deleteData(`/api/education/group/${id}`),
    {
      onSuccess: () => {
        queryclient.invalidateQueries(["groups"]);
      },
    }
  );
};

export default useDeleteGroup;
