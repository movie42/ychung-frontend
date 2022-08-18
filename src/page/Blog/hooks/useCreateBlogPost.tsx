import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogPostVariable } from "./interface";

const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const api = new API();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<BlogPostData, Error, BlogPostVariable>(
    async (body) => await api.postData(`/api/blog/create`, body),
    {
      onSuccess: (response) => {
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success",
        });
        queryClient.invalidateQueries(["posts"]);
        const { _id } = response;
        navigate(`/blog/${_id}`);
      },
    }
  );
};

export default useCreateBlogPost;
