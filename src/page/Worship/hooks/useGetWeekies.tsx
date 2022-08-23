import { api } from "@/lib/api";
import { IWorshipItems } from "@/lib/state";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

interface WorshipData {
  data: IWorshipItems[];
}

const useGetWeekies = () => {
  return useQuery<WorshipData, AxiosError, IWorshipItems[]>(
    ["weeklies"],
    () => api.getData("/api/worship"),
    {
      select: ({ data }) => data,
    }
  );
};

export default useGetWeekies;
