import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogUpdateVariable } from "./interface";

const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = new API();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<BlogPostData, Error, BlogUpdateVariable>(
    ({ id, body }) => api.postData(`/api/blog/${id}`, body),
    {
      onSuccess: ({ _id }) => {
        handleAddSnackBar({
          message: snackbarStatusCode[202],
          type: "success",
        });
        queryClient.invalidateQueries(["posts"]);
        navigate(`/blog/${_id}`, {
          replace: true,
        });
      },
    }
  );
};

export default useUpdateBlogPost;
