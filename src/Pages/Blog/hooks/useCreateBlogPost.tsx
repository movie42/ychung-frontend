import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogPostVariable } from "./interface";

interface BlogCreate {
  data: BlogPostData;
}

const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<BlogCreate, AxiosError, BlogPostVariable>(
    async (body) => await api.postData("/api/blog/create", body),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["posts"]);
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success"
        });
        const { _id } = data;
        navigate(`/blog/${_id}`);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useCreateBlogPost;
