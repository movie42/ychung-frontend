import { useMutation } from "react-query";
import { SetterOrUpdater } from "recoil";
import { AxiosError } from "axios";
import { api } from "../api";

const useSetView = <T,>(url: string, recoilSetter: SetterOrUpdater<T>) => {
  const { mutate } = useMutation<any, AxiosError, any>(
    async (body: any) => {
      const response = await api.postData(url, { ...body });

      return response.views;
    },
    {
      onSuccess: (views) => {
        recoilSetter((pre) => ({ ...pre, views }));
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );

  const countViews = async () => {
    mutate({ views: 1 });
  };

  return countViews;
};
export default useSetView;
