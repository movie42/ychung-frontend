import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/api";
import { INoticeInterface } from "@/lib/state";

interface NoticeQueryData {
  id: string;
  data: INoticeInterface;
}
interface GetNoticeParams {
  id: string;
}
const useGetNotice = ({ id }: GetNoticeParams) => {
  return useQuery<NoticeQueryData, AxiosError, INoticeInterface>(
    ["notice", id],
    () => api.getData(`/api/notice/${id}`),
    {
      select: ({ data }) => data,
      staleTime: 500000,
      cacheTime: 500000,
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  );
};

export default useGetNotice;
