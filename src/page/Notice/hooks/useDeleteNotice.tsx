import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeDeleteVariable {
  id: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const api = new API();
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<NoticeDeleteData, Error, NoticeDeleteVariable>(
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
