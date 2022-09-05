import { INoticeInterface } from "@/lib/state";
import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

interface NoticeQueryData {
  data: INoticeInterface[];
}

const useGetNotice = () => {
  const [limit, setlimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const query = useQuery<NoticeQueryData, AxiosError, INoticeInterface[]>(
    ["notices"],
    () => api.getData(`/api/notice?limit=${limit}&offset=${offset}`),
    {
      select: ({ data }) => data,
      cacheTime: 500000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return { limit, setlimit, offset, setOffset, ...query };
};

export default useGetNotice;
