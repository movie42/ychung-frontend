import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
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

  return useMutation<WeeklyDeleteData, Error, WeeklyDeleteVariable>(
    ({ id }) => api.deleteData(`/api/worship/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["weeklies"]);
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success",
        });
        navigate("/worship");
      },
    }
  );
};

export default useDeleteWeekly;
