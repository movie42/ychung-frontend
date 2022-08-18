import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import React from "react";
import { useMutation } from "react-query";

interface JoinData {}
interface JoinVariable {
  email: string;
  userName: string;
  name: string;
  password: string;
}

const useJoin = () => {
  const api = new API();
  const { handleAddSnackBar } = useSetSnackBar();
  return useMutation<JoinData, Error, JoinVariable>(
    (body) => api.postData("/api/join", body),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[203],
          type: "success",
        });
      },
    }
  );
};

export default useJoin;
