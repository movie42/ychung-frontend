import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { EducationPersonData, EducationPersonVariable } from "./interface";

const useAddNewPerson = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<
    EducationPersonData[],
    AxiosError,
    EducationPersonVariable
  >(({ id, body }) => api.postData(`/api/education/group/${id}/people`, body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
    onError: (error) => {
      redirectLogoutPage(error);
    },
  });
};

export default useAddNewPerson;
