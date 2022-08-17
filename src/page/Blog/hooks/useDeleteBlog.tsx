import { API } from "@/lib/api";
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

  return useMutation<NoticeDeleteData, Error, NoticeDeleteVariable>(
    ({ id }) => api.deleteData(`/api/notice/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notices"]);
      },
    }
  );
};

export default useDeleteNotice;
