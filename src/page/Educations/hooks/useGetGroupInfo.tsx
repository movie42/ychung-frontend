import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationGroupInfoData } from "./interface";

const useGetGroupInfo = (id: string) => {
  const api = new API();
  return useQuery<EducationGroupInfoData, Error>(["groupInfo", id], () =>
    api.getData<EducationGroupInfoData>(`/api/education/groups/${id}`)
  );
};

export default useGetGroupInfo;
