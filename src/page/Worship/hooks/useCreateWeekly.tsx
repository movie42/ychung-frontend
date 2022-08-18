import { API } from "@/lib/api";
import { IWorshipItems } from "@/lib/state";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

const useCreateWeekly = () => {
  const queryClient = useQueryClient();
  const api = new API();
  const navigate = useNavigate();

  return useMutation<IWorshipItems, Error, IWorshipItems>(
    async (body) =>
      await api.postData<IWorshipItems, IWorshipItems>(
        `/api/worship/create`,
        body
      ),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["weeklies"]);
        const { _id } = response;
        navigate(`/worship/${_id}`);
      },
    }
  );
};

export default useCreateWeekly;
