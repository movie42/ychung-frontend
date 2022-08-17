import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import {
  EducationGroupInfoData,
  EducationGroupInfoVariable,
} from "./interface";

const usePatchGroupInfo = () => {
  const api = new API();
  const queryClient = useQueryClient();
  return useMutation<EducationGroupInfoData, Error, EducationGroupInfoVariable>(
    ({ id, body }) => api.patchData(`/api/education/groups/${id}`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
      },
    }
  );
};

export default usePatchGroupInfo;
