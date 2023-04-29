import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationGroupData, EducationGroupVariable } from "./interface";

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<EducationGroupData, AxiosError, EducationGroupVariable>(
    ({ body }) => api.patchData("/api/education/group/update", body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useUpdateGroup;
