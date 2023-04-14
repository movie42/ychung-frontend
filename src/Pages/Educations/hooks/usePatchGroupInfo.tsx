import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  EducationGroupInfoData,
  EducationGroupInfoVariable
} from "./interface";

const usePatchGroupInfo = () => {
  const { handleAddSnackBar } = useSetSnackBar();
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<
    EducationGroupInfoData,
    AxiosError,
    EducationGroupInfoVariable
  >(({ id, body }) => api.patchData(`/api/education/groups/${id}`, body), {
    onSuccess: () => {
      handleAddSnackBar({
        message: snackbarStatusCode[202],
        type: "success"
      });
      queryClient.invalidateQueries(["groupInfo"]);
    },
    onError: (error) => {
      redirectLogoutPage(error);
    }
  });
};

export default usePatchGroupInfo;
