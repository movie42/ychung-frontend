import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogDeleteData, BlogDeleteVariable } from "./interface";

const useDeleteBlogPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<{ data: BlogDeleteData }, AxiosError, BlogDeleteVariable>(
    ({ id }) => api.deleteData(`/api/blog/${id}`),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success"
        });
        queryClient.invalidateQueries(["posts"]);
        navigate("/blog");
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useDeleteBlogPost;
