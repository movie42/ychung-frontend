import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface WeeklyDeleteData {
  data: string;
}
interface WeeklyDeleteVariable {
  id: string;
}

const useDeleteWeekly = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<WeeklyDeleteData, AxiosError, WeeklyDeleteVariable>(
    ({ id }) => api.deleteData(`/api/worship/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["weeklies"]);
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success"
        });
        navigate("/worship");
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useDeleteWeekly;
