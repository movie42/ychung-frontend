import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import {
  EducationGroupInfoData,
  EducationGroupInfoVariable,
} from "./interface";

const usePatchGroupInfo = () => {
  const api = new API();
  const { handleAddSnackBar } = useSetSnackBar();
  const queryClient = useQueryClient();
  return useMutation<EducationGroupInfoData, Error, EducationGroupInfoVariable>(
    ({ id, body }) => api.patchData(`/api/education/groups/${id}`, body),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[202],
          type: "success",
        });
        queryClient.invalidateQueries(["groupInfo"]);
      },
    }
  );
};

export default usePatchGroupInfo;
