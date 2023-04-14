import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

interface LogoutData {
  isLogout: boolean;
}

const useLogout = () => {
  return useQuery<LogoutData, AxiosError>(["logout"], () =>
    api.getData("/api/logout")
  );
};

export default useLogout;
