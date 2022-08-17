import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationPeopleData } from "./interface";

const useGetPeople = (id: string) => {
  const api = new API();
  return useQuery<EducationPeopleData[], Error>(["people", id], () =>
    api.getData<EducationPeopleData[]>(`/api/education/group/${id}/people`)
  );
};

export default useGetPeople;
