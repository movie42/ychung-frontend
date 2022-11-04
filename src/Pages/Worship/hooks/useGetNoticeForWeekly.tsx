import { INoticeInterface } from "@/lib/state";
import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

interface NoticeQueryData {
  id: string;
  data: INoticeInterface[];
}

const useGetNoticeForWeekly = () => {
  return useQuery<NoticeQueryData, AxiosError, INoticeInterface[]>(
    ["weekly", "notices"],
    () => api.getData("/api/worship/weekly/notices"),
    {
      select: ({ data }) => data,
      staleTime: 500000,
      cacheTime: 500000,
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  );
};

export default useGetNoticeForWeekly;
