import { API } from "@/lib/api";
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
  return useMutation<JoinData, Error, JoinVariable>(
    (body) => api.postData("/api/join", body),
    {
      onSuccess: () => {},
    }
  );
};

export default useJoin;
