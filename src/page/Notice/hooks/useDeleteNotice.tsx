import { AxiosError } from "axios";
import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";

interface NoticeDeleteVariable {
  id: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<NoticeDeleteData, AxiosError, NoticeDeleteVariable>(
    ({ id }) => api.deleteData(`/api/notice/${id}`),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success",
        });
        queryClient.invalidateQueries(["notices"]);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useDeleteNotice;
