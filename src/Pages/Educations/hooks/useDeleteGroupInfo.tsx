import { api, snackbarStatusCode } from "@/lib/api";
import { AxiosError } from "axios";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const useDeleteGroupInfo = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<unknown, AxiosError, { id: string }>(
    ({ id }) => api.deleteData(`/api/education/groups/${id}`),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success"
        });
        queryclient.invalidateQueries(["groupInfo"]);
        navigate("/education");
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useDeleteGroupInfo;
