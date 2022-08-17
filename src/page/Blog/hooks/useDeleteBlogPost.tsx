import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogDeleteData, BlogDeleteVariable } from "./interface";

const useDeleteBlogPost = () => {
  const api = new API();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<BlogDeleteData, Error, BlogDeleteVariable>(
    ({ id }) => api.deleteData(`/api/blog/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        navigate("/blog", { replace: true });
      },
    }
  );
};

export default useDeleteBlogPost;
