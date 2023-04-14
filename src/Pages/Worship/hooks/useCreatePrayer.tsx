import { api } from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

export interface CreatePrayer {
  name: string;
  start: string;
  end: string;
}

const useCreatePrayer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError, CreatePrayer>(
    async (body) => await api.postData("/api/worship/prayer", body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["prayers"]);
        navigate("/worship/prayer");
      }
    }
  );
};

export default useCreatePrayer;
