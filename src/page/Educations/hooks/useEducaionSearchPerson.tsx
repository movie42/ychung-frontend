import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { EducationPeopleData } from "./interface";

const useEducaionSearchPerson = (
  searchPersonName: string,
  setSearchPerson: React.Dispatch<
    React.SetStateAction<EducationPeopleData[] | null | undefined>
  >
) => {
  return useQuery<{ data: EducationPeopleData[] }, AxiosError>(
    ["search"],
    () => api.getData(`/api/education/search?person=${searchPersonName}`),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setSearchPerson(data);
      },
    }
  );
};

export default useEducaionSearchPerson;
