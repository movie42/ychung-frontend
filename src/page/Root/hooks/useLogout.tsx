import { API } from "@/lib/api";
import { useQuery } from "react-query";

interface LogoutData {
  isLogout: boolean;
}

const useLogout = () => {
  const api = new API();

  return useQuery<LogoutData>(["logout"], () =>
    api.getData<LogoutData>("/api/logout")
  );
};

export default useLogout;
