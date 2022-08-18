import { INoticeInterface } from "@/lib/state";
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

const useCreateNotice = () => {
  const queryClient = useQueryClient();
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
        const { _id } = response;
        navigate(`/notice/${_id}`);
      },
    }
  );
};

export default useCreateNotice;
