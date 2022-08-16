import { INoticeInterface } from "@/state";
import { API } from "@/utils/api";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeUpdateVariable {
  _id: string;
  body: NoticeBody;
}

interface NoticeBody {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
    userName: string;
    name: string;
  };
  createdAt: string;
}

const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const api = new API();
  const navigate = useNavigate();

  return useMutation<INoticeInterface, Error, NoticeUpdateVariable>(
    async ({ _id, body }) =>
      api.postData<INoticeInterface, NoticeBody>(`/api/notice/${_id}`, body),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["notices"]);
        const { _id } = response;
        navigate(`/notice/${_id}`);
      },
    }
  );
};

export default useUpdateNotice;
