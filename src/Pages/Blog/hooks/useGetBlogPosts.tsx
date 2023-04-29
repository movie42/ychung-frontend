import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BlogPostData } from "./interface";

const useGetBlogPosts = () => {
  return useQuery<{ data: BlogPostData[] }, AxiosError, BlogPostData[]>(
    ["posts"],
    () => api.getData("/api/blog"),
    {
      select: ({ data }) => data,
      staleTime: 300000
    }
  );
};

export default useGetBlogPosts;
