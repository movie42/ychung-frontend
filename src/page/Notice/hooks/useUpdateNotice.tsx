import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeUpdateData {
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
  body: NoticeUpdateData;
}

const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = new API();

  return useMutation<NoticeUpdateData, Error, NoticeUpdateVariable>(
    ({ id, body }) => api.postData(`/api/notice/${id}`, body),
    {
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries(["notices"]);
        navigate(`/notice/${response._id}`, {
          replace: true,
        });
      },
    }
  );
};

export default useUpdateNotice;
