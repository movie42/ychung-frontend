import { API } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeDeleteVariable {
  _id: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const api = new API();
  const queryClient = useQueryClient();

  return useMutation<NoticeDeleteData, Error, NoticeDeleteVariable>(
    ({ _id }) => api.deleteData(`/api/notice/${_id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notices"]);
      },
    }
  );
};

export default useDeleteNotice;
