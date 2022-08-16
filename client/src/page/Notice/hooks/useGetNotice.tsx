import { INoticeInterface } from "@/state";
import { API } from "@/utils/api";
import { useQuery } from "react-query";

const useGetNotice = () => {
  const api = new API();
  return useQuery<INoticeInterface[]>(["notices"], () =>
    api.getData<INoticeInterface[]>("/api/notice")
  );
};

export default useGetNotice;
