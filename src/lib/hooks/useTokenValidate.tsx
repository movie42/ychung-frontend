import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import useTokenErrorHandler from "./useTokenErrorHandler";

interface IuseTokenValidateProps {
  isLogin: boolean;
  message: string;
}

const useTokenValidate = () => {
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useQuery<IuseTokenValidateProps, AxiosError>(
    ["token"],
    () => api.getData("/api/token-validate"),
    {
      retry: 0,
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useTokenValidate;
