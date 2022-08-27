import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { IWorshipItems } from "@/lib/state";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

const useCreateWeekly = () => {
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  const navigate = useNavigate();

  return useMutation<{ data: IWorshipItems }, AxiosError, IWorshipItems>(
    async (body) => await api.postData(`/api/worship/create`, body),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["weeklies"]);
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success",
        });
        const { _id } = data;
        navigate(`/worship/${_id}`);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useCreateWeekly;
