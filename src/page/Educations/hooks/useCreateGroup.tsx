import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { EducatioCreateGroupVariable, EducationGroupData } from "./interface";

const useCreateGroup = () => {
  const queryClient = useQueryClient();
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
  });
};

export default useCreateGroup;
