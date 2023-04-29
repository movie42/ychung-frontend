import { api } from "@/lib/api";
import { useTokenErrorHandler } from "@/lib/hooks";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { EducationPeopleData } from "./interface";

const useEducaionSearchPerson = (
  searchPersonName: string,
  setSearchPerson: React.Dispatch<
    React.SetStateAction<EducationPeopleData[] | null | undefined>
  >
) => {
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useQuery<{ data: EducationPeopleData[] }, AxiosError>(
    ["search"],
    () => api.getData(`/api/education/search?person=${searchPersonName}`),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setSearchPerson(data);
      },
      onError: (error) => {
        redirectLogoutPage(error);
      }
    }
  );
};

export default useEducaionSearchPerson;
