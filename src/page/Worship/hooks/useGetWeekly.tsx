import { api } from "@/lib/api";
import { IWorshipItems } from "@/lib/state";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

interface WorshipData {
  data: IWorshipItems;
}

interface GetWeeklyProps {
  id: string;
}

const useGetWeekly = ({ id }: GetWeeklyProps) => {
  return useQuery<WorshipData, AxiosError, IWorshipItems>(
    ["weekly", id],
    () => api.getData(`/api/worship/${id}`),
    {
      select: ({ data }) => data
    }
  );
};

export default useGetWeekly;
