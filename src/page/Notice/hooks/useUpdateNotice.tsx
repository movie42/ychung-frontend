import { api, snackbarStatusCode } from "@/lib/api";
import { AxiosError } from "axios";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeUpdateData {
  data: {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    summary: string;
    isWeekly: boolean;
    paragraph: string;
    creator: {
      _id: string;
      userName: string;
      name: string;
    };
    createdAt: string;
  };
}

interface NoticeBody {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
    userName: string;
    name: string;
  };
  createdAt: string;
}

interface NoticeUpdateVariable {
  id: string;
  body: NoticeBody;
}

const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<NoticeUpdateData, AxiosError, NoticeUpdateVariable>(
    ({ id, body }) => api.postData(`/api/notice/${id}`, body),
    {
      onSuccess: ({ data }) => {
        handleAddSnackBar({
          message: snackbarStatusCode[202],
          type: "success",
        });
        queryClient.invalidateQueries(["notices"]);
        navigate(`/notice/${data._id}`);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useUpdateNotice;
