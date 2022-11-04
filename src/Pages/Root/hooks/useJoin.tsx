import { api, snackbarStatusCode } from "@/lib/api";
import { AxiosError } from "axios";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation } from "react-query";

interface JoinVariable {
  email: string;
  userName: string;
  name: string;
  password: string;
}

const useJoin = () => {
  const { handleAddSnackBar } = useSetSnackBar();
  return useMutation<any, AxiosError, JoinVariable>(
    (body) => api.postData("/api/join", body),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[203],
          type: "success"
        });
      }
    }
  );
};

export default useJoin;
