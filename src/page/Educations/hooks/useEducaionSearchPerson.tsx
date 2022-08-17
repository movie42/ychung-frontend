import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationPeopleData } from "./interface";

const useEducaionSearchPerson = (
  searchPersonName: string,
  setSearchPerson: React.Dispatch<
    React.SetStateAction<EducationPeopleData[] | null | undefined>
  >
) => {
  const api = new API();
  return useQuery<EducationPeopleData[], Error>(
    ["search"],
    () => api.getData(`/api/education/search?person=${searchPersonName}`),
    {
      enabled: false,
      onSuccess: (response) => {
        setSearchPerson(response);
      },
    }
  );
};

export default useEducaionSearchPerson;
