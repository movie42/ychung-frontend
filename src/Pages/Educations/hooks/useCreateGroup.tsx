import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducatioCreateGroupVariable, EducationGroupData } from "./interface";

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<
    EducationGroupData,
    AxiosError,
    EducatioCreateGroupVariable
  >(({ id, body }) => api.postData(`/api/education/groups/${id}/group`, body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["groupInfo"]);
      queryClient.invalidateQueries(["groups"]);
      queryClient.invalidateQueries(["people"]);
    },
    onError: (error) => {
      redirectLogoutPage(error);
    }
  });
};

export default useCreateGroup;
