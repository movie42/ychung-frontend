import { INoticeInterface } from "@/lib/state";
import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

interface NoticeQueryData {
  data: INoticeInterface[];
}

const useGetNotice = () => {
  return useQuery<NoticeQueryData, AxiosError, INoticeInterface[]>(
    ["notices"],
    () => api.getData("/api/notice"),
    {
      select: ({ data }) => data,
      staleTime: 300000,
    }
  );
};

export default useGetNotice;
