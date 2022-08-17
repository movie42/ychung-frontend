import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogPostData, BlogUpdateVariable } from "./interface";

const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = new API();

  return useMutation<BlogPostData, Error, BlogUpdateVariable>(
    ({ id, body }) => api.postData(`/api/blog/${id}`, body),
    {
      onSuccess: ({ _id }) => {
        queryClient.invalidateQueries(["posts"]);
        navigate(`/blog/${_id}`, {
          replace: true,
        });
      },
    }
  );
};

export default useUpdateBlogPost;
