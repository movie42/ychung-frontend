import React from "react";
import { api } from "@/lib/api";
import { INoticeInterface } from "@/lib/state";
import { AxiosError } from "axios";
import { useInfiniteQuery } from "react-query";

interface IuseGetNoticeItem2Props {
  size: number;
}

interface NoticeQueryData {
  data: INoticeInterface[];
  isLastPage: boolean;
  pageNumber: number;
}

const useGetNoticeItem2 = ({ size }: IuseGetNoticeItem2Props) => {
  return useInfiniteQuery<NoticeQueryData, AxiosError, NoticeQueryData>(
    ["notices"],
    ({ pageParam = 0 }) =>
      api.getData(`/api/notice`, { params: { page: pageParam, size } }),
    {
      getNextPageParam: ({ isLastPage, pageNumber }) => {
        return isLastPage ? undefined : pageNumber + 1;
      },
      cacheTime: 5 * 60 * 1000,
    }
  );
};

export default useGetNoticeItem2;
