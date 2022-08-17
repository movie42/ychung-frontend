import { API } from "@/lib/api";
import { IWorshipItems } from "@/state";
import { useQuery } from "react-query";

const useGetWeekies = () => {
  const api = new API();
  return useQuery<IWorshipItems[]>(["weeklies"], () =>
    api.getData<IWorshipItems[]>("/api/worship")
  );
};

export default useGetWeekies;
