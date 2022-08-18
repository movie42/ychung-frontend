import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface IuseDeleteGroupInfoProps {}

const useDeleteGroupInfo = () => {
  const api = new API();
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  return useMutation(
    (id: string) => api.deleteData(`/api/education/groups/${id}`),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success",
        });
        queryclient.invalidateQueries(["groupInfo"]);
        navigate("/education");
      },
    }
  );
};

export default useDeleteGroupInfo;
