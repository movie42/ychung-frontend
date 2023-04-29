import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { INoticeInterface } from "@/lib/state";

interface NoticeCreate {
  data: INoticeInterface;
}

const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();
  const navigate = useNavigate();

  return useMutation<NoticeCreate, AxiosError, INoticeInterface>(
    (body) => api.postData("/api/notice/create", body),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["notices"]);
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success"
        });
        const { _id } = data;
        navigate(`/notice/${_id}`);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useCreateNotice;
