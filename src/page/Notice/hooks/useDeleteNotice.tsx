import { api, snackbarStatusCode } from "@/lib/api";
import { AxiosError } from "axios";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";

interface NoticeDeleteVariable {
  id: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const queryClient = useQueryClient();
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
    }
  );
};

export default useDeleteNotice;
