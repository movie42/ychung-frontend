import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { loginState } from "@/lib/state";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";

interface LoginData {
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
  const api = new API();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<LoginData, Error, LoginVariable>(
    (body) => api.postData("/api/login", body),
    {
      onSuccess: (response) => {
        setIsLogin(response);
        handleAddSnackBar({
          message: snackbarStatusCode[204],
          type: "success",
        });
        localStorage.setItem("ycUser", JSON.stringify(response));
        navigate("/");
      },
    }
  );
};

export default useLogin;
