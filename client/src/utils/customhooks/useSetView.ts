import { useEffect } from "react";
import { useMutation } from "react-query";
import { SetterOrUpdater } from "recoil";
import { postRequest } from "../utilities/httpMethod";
import { useFetchToken } from "./useFetchToken";

export const useSetView = <T>(
  url: RequestInfo,
  recoilSetter: SetterOrUpdater<T>
) => {
  const { csrfToken, csrf } = useFetchToken();
  const {
    isSuccess,
    mutate,
    data: serverView,
  } = useMutation(async (body: any) => {
    const response = await fetch(url, postRequest(body, csrfToken));
    return await response.json();
  });

  const countViews = async () => {
    await csrf();
    mutate({ views: 1 });
  };

  useEffect(() => {
    if (isSuccess) {
      recoilSetter((pre) => ({ ...pre, views: serverView.views }));
    }
  }, [serverView]);

  return countViews;
};
