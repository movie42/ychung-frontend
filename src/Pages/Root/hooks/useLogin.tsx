import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { loginState } from "@/lib/state";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";

interface LoginData {
  data: LoginDataProps;
}

interface LoginDataProps {
  isLogin: boolean;
  _id: string;
  authority: number;
  email: string;
}

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<LoginData, AxiosError, LoginVariable>(
    (body) => api.postData("/api/login", body),
    {
      onSuccess: ({ data }) => {
        setIsLogin(data);
        handleAddSnackBar({
          message: snackbarStatusCode[204],
          type: "success"
        });
        localStorage.setItem("ycUser", JSON.stringify(data));
        navigate("/");
      }
    }
  );
};

export default useLogin;
