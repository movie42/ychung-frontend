import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EducationPeopleData } from "./interface";

const useGetPeople = (id: string) => {
  return useQuery<
    { data: EducationPeopleData[] },
    Error,
    EducationPeopleData[]
  >(["people", id], () => api.getData(`/api/education/group/${id}/people`), {
    select: ({ data }) => data
  });
};

export default useGetPeople;
