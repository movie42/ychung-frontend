import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { EducationGroupData, EducationGroupVariable } from "./interface";

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<EducationGroupData, Error, EducationGroupVariable>(
    ({ body }) => api.patchData(`/api/education/group/update`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useUpdateGroup;
