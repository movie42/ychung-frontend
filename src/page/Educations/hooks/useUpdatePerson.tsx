import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { EducationPersonData, EducationPersonVariable } from "./interface";

const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation<EducationPersonData, Error, EducationPersonVariable>(
    ({ id, body }) => api.patchData(`/api/education/people/${id}`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useUpdatePerson;
