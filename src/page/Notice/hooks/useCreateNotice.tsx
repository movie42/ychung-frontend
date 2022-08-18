import { INoticeInterface, snackbarState } from "@/lib/state";
import { API, snackbarStatusCode } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { useSetSnackBar } from "@/lib/hooks";

const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const api = new API();
  const navigate = useNavigate();

  return useMutation<INoticeInterface, Error, INoticeInterface>(
    async (body) =>
      await api.postData<INoticeInterface, INoticeInterface>(
        `/api/notice/create`,
        body
      ),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["notices"]);
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success",
        });
        const { _id } = response;
        navigate(`/notice/${_id}`, { replace: true });
      },
    }
  );
};

export default useCreateNotice;
