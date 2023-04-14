import { api } from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import { CreatePrayer } from "./useCreatePrayer";

type UpdatePrayer = CreatePrayer;

const useUpdatePrayer = () => {
  const queryClient = useQueryClient();
  const { prayerId } = useParams();
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError, UpdatePrayer>(
    (body) => api.putData(`/api/worship/prayer/${prayerId}`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["prayers"]);
        navigate("/worship/prayer");
      }
    }
  );
};

export default useUpdatePrayer;
