import { AxiosError } from "axios";
import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";

interface NoticeDeleteVariable {
  noticeId: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const { redirectLogoutPage } = useTokenErrorHandler();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<NoticeDeleteData, AxiosError, NoticeDeleteVariable>(
    ({ noticeId }) => api.deleteData(`/api/notice/${noticeId}`),
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
