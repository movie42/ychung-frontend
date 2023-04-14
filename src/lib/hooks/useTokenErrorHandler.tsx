import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useTokenErrorHandler = () => {
  const navigate = useNavigate();

  const redirectLogoutPage = (error: AxiosError) => {
    if (error.code === "ERR_BAD_REQUEST" && error.response?.data) {
      const { isLogin } = error.response?.data as {
        isLogin?: false;
      };
      if (!isLogin) {
        navigate("/logout", {
          state: { message: "🥲 로그인을 다시 해야해요." }
        });
      }
    }
  };

  return { redirectLogoutPage };
};

export default useTokenErrorHandler;
