import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { EducationGroupData } from "./interface";

const useGetGroups = (id: string) => {
  return useQuery<
    { data: EducationGroupData[] },
    AxiosError,
    EducationGroupData[]
  >(["groups", id], () => api.getData(`/api/education/groups/${id}/group`), {
    select: ({ data }) => data
  });
};

export default useGetGroups;
