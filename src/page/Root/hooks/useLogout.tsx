import { API } from "@/lib/api";
import { loginState } from "@/lib/state";
import { useQuery } from "react-query";
import { useResetRecoilState } from "recoil";

interface LogoutData {
  isLogout: boolean;
}

const useLogout = () => {
  const api = new API();
  const removeLoginState = useResetRecoilState(loginState);

  return useQuery<LogoutData>(
    ["logout"],
    () => api.getData<LogoutData>("/api/logout"),
    {
      onSuccess: () => {
        removeLoginState();
        localStorage.removeItem("ycUser");
      },
    }
  );
};

export default useLogout;
