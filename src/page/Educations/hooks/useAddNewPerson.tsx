import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { EducationPersonData, EducationPersonVariable } from "./interface";

const useAddNewPerson = () => {
  const queryClient = useQueryClient();

  return useMutation<
    EducationPersonData[],
    AxiosError,
    EducationPersonVariable
  >(({ id, body }) => api.postData(`/api/education/group/${id}/people`, body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });
};

export default useAddNewPerson;
