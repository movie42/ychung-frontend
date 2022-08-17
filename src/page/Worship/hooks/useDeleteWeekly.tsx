import { API } from "@/lib/api";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface WeeklyDeleteData {
  data: string;
}
interface WeeklyDeleteVariable {
  id: string;
}

const useDeleteWeekly = () => {
  const api = new API();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<WeeklyDeleteData, Error, WeeklyDeleteVariable>(
    ({ id }) => api.deleteData(`/api/worship/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["weeklies"]);
        navigate("/worship");
      },
    }
  );
};

export default useDeleteWeekly;
