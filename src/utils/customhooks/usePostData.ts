import { useMutation } from "react-query";
import { postRequest } from "../utilities/httpMethod";
import { useFetchToken } from "./useFetchToken";

export const usePostData = (url: RequestInfo) => {
  const { csrfToken, csrf } = useFetchToken();
  const { isLoading, isSuccess, mutate, data } = useMutation(
    async (body: any) => {
      const response = await fetch(url, postRequest(body, csrfToken));
      return await response.json();
    }
  );

  const mutationHandler = async (body: any) => {
    await csrf();
    mutate(body);
  };

  return { mutationHandler, isSuccess, data, isLoading };
};
