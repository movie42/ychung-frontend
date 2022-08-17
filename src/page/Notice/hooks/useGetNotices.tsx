import { INoticeInterface } from "@/state";
import { API } from "@/lib/api";
import { useQuery } from "react-query";

const useGetNotice = () => {
  const api = new API();
  return useQuery<INoticeInterface[]>(
    ["notices"],
    () => api.getData<INoticeInterface[]>("/api/notice"),
    {
      staleTime: 300000,
    }
  );
};

export default useGetNotice;
