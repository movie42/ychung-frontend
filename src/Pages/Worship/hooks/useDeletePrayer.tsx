import { api } from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "react-query";

const useDeletePrayer = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, string>(
    (prayerId) => api.deleteData(`/api/worship/prayer/${prayerId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["prayers"]);
      }
    }
  );
};

export default useDeletePrayer;
