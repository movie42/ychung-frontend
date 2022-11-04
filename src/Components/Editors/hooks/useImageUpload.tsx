import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

const useImageUpload = () => {
  return useMutation<{ data: string }, AxiosError, FormData>(
    async (body) => await api.postMultiPartData("/api/image/editor", body)
  );
};

export default useImageUpload;
