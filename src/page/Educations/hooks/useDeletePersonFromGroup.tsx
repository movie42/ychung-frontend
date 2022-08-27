import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface DeletePerson {
  groupId: string;
  personId: string;
}

const useDeletePersonFromGroup = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<unknown, AxiosError, DeletePerson>(
    ({ groupId, personId }) =>
      api.deleteData(
        `/api/education/group/${groupId}/people?person=${personId}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useDeletePersonFromGroup;
