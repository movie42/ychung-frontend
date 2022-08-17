import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";

const useDeleteGroup = () => {
  const api = new API();
  const queryclient = useQueryClient();
  return useMutation(
    (id: string) => api.deleteData(`/api/education/group/${id}`),
    {
      onSuccess: () => {
        queryclient.invalidateQueries(["groups"]);
      },
    }
  );
};

export default useDeleteGroup;
