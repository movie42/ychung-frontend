import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { EducatioCreateGroupVariable, EducationGroupData } from "./interface";

const useCreateGroup = () => {
  const api = new API();
  const queryClient = useQueryClient();
  return useMutation<EducationGroupData, Error, EducatioCreateGroupVariable>(
    ({ id, body }) => api.postData(`/api/education/groups/${id}/group`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useCreateGroup;
