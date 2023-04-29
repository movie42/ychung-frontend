import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface IuseGetNoticeItem2Props {
  pageParam: number;
  size: number;
  queryKey: [string];
  url: string;
}

interface QueryData<T> {
  data: T[];
  isLastPage: boolean;
  pageNumber: number;
}

const useGetInfinityItem = <T,>({
  pageParam,
  size,
  queryKey,
  url
}: IuseGetNoticeItem2Props) => {
  const pageNumber = pageParam;
  return useInfiniteQuery<QueryData<T>, AxiosError, QueryData<T>>(
    queryKey,
    ({ pageParam = pageNumber }) =>
      api.getData(url, { params: { page: pageParam, size } }),
    {
      getNextPageParam: ({ isLastPage, pageNumber }) => {
        return isLastPage ? undefined : pageNumber + 1;
      },
      cacheTime: 5 * 60 * 1000
    }
  );
};

export default useGetInfinityItem;
