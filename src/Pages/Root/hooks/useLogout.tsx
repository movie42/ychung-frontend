import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

interface LogoutData {
  isLogout: boolean;
}

const useLogout = () => {
  return useQuery<LogoutData, AxiosError>(["logout"], () =>
    api.getData("/api/logout")
  );
};

export default useLogout;
