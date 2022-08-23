import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogPostVariable } from "./interface";

const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<{ data: BlogPostData }, Error, BlogPostVariable>(
    async (body) => await api.postData(`/api/blog/create`, body),
    {
      onSuccess: ({ data }) => {
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success",
        });
        queryClient.invalidateQueries(["posts"]);
        const { _id } = data;
        navigate(`/blog/${_id}`);
      },
    }
  );
};

export default useCreateBlogPost;
