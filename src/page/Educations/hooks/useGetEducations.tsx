import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationGetData } from "./interface";

const useGetEducations = () => {
  const api = new API();
  return useQuery<EducationGetData[]>(
    ["educations"],
    () => api.getData<EducationGetData[]>("/api/education/groups"),
    { onSuccess: () => {} }
  );
};

export default useGetEducations;
