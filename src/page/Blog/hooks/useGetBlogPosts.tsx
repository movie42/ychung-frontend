import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { BlogPostData } from "./interface";

const useGetBlogPosts = () => {
  const api = new API();
  return useQuery<BlogPostData[]>(["posts"], () => api.getData("/api/blog"), {
    staleTime: 300000,
  });
};

export default useGetBlogPosts;
