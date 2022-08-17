import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";

import { EducationPersonData, EducationPersonVariable } from "./interface";

const useAddNewPerson = () => {
  const api = new API();
  const queryClient = useQueryClient();

  return useMutation<EducationPersonData[], Error, EducationPersonVariable>(
    ({ id, body }) => api.postData(`/api/education/group/${id}/people`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useAddNewPerson;
