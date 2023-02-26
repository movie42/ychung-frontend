import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export interface Prayer {
  name: string;
  start: string;
  end: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ResponsePrayer extends Prayer {
  _id: string;
}

export interface RegulationPrayer {
  month: number;
  data: Omit<ResponsePrayer, "createdAt" | "updatedAt">[];
}

const useGetPrayers = () => {
  return useQuery<ResponsePrayer[], AxiosError, RegulationPrayer[]>(
    ["prayers"],
    () => api.getData("/api/worship/prayer"),
    {
      select: (prayers) => {
        const jan = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 0) {
            return {
              _id: prayer._id,
              name: prayer.name,
              start: prayer.start
            };
          }
        });
        const feb = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 1) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const mar = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 2) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const apr = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 3) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const may = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 4) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const jun = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 5) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const jul = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 6) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const aug = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 7) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const sep = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 8) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const oct = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 9) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const nov = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 10) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });
        const dec = prayers.filter((prayer) => {
          if (new Date(prayer.start).getMonth() === 11) {
            return { _id: prayer._id, name: prayer.name, start: prayer.start };
          }
        });

        return [
          { month: 0, data: jan },
          { month: 1, data: feb },
          { month: 2, data: mar },
          { month: 3, data: apr },
          { month: 4, data: may },
          { month: 5, data: jun },
          { month: 6, data: jul },
          { month: 7, data: aug },
          { month: 8, data: sep },
          { month: 9, data: oct },
          { month: 10, data: nov },
          { month: 11, data: dec }
        ];
      }
    }
  );
};

export default useGetPrayers;
