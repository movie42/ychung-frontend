import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { EducationGetData } from "./interface";

const useGetEducations = () => {
  return useQuery<{ data: EducationGetData[] }, AxiosError, EducationGetData[]>(
    ["educations"],
    () => api.getData("/api/education/groups"),
    { select: ({ data }) => data }
  );
};

export default useGetEducations;
