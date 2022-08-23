import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { BlogDeleteData, BlogDeleteVariable } from "./interface";

const useDeleteBlogPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<{ data: BlogDeleteData }, Error, BlogDeleteVariable>(
    ({ id }) => api.deleteData(`/api/blog/${id}`),
    {
      onSuccess: () => {
        handleAddSnackBar({
          message: snackbarStatusCode[201],
          type: "success",
        });
        queryClient.invalidateQueries(["posts"]);
        navigate("/blog", { replace: true });
      },
    }
  );
};

export default useDeleteBlogPost;
