import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogUpdateVariable } from "./interface";

const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();

  return useMutation<{ data: BlogPostData }, AxiosError, BlogUpdateVariable>(
    ({ id, body }) => api.postData(`/api/blog/${id}`, body),
    {
      onSuccess: ({ data }) => {
        handleAddSnackBar({
          message: snackbarStatusCode[202],
          type: "success",
        });
        queryClient.invalidateQueries(["posts"]);
        const { _id } = data;
        navigate(`/blog/${_id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        redirectLogoutPage(error);
      },
    }
  );
};

export default useUpdateBlogPost;
