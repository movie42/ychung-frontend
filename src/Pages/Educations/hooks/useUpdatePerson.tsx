import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationPersonData, EducationPersonVariable } from "./interface";

const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<EducationPersonData, AxiosError, EducationPersonVariable>(
    ({ id, body }) => api.patchData(`/api/education/people/${id}`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["people"]);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useUpdatePerson;
