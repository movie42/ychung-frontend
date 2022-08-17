import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationGroupData } from "./interface";

const useGetGroups = (id: string) => {
  const api = new API();
  return useQuery<EducationGroupData[], Error>(["groups", id], () =>
    api.getData<EducationGroupData[]>(`/api/education/groups/${id}/group`)
  );
};

export default useGetGroups;
