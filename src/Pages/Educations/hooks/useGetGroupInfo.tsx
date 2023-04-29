import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EducationGroupInfoData } from "./interface";

const useGetGroupInfo = (id: string) => {
  return useQuery<
    { data: EducationGroupInfoData },
    Error,
    EducationGroupInfoData
  >(["groupInfo", id], () => api.getData(`/api/education/groups/${id}`), {
    select: ({ data }) => data
  });
};

export default useGetGroupInfo;
