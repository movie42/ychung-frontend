import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/api";

const useImageUpload = () => {
  return useMutation<{ data: string }, AxiosError, FormData>(
    async (body) => await api.postMultiPartData("/api/image/editor", body)
  );
};

export default useImageUpload;
