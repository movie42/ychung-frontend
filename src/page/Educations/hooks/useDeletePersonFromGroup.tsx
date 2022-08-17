import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";

interface DeletePerson {
  groupId: string;
  personId: string;
}

const useDeletePersonFromGroup = () => {
  const queryClient = useQueryClient();
  const api = new API();

  return useMutation<unknown, Error, DeletePerson>(
    ({ groupId, personId }) =>
      api.deleteData(
        `/api/education/group/${groupId}/people?person=${personId}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useDeletePersonFromGroup;
