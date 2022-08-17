import { useEffect } from "react";
import { useMutation } from "react-query";
import { SetterOrUpdater } from "recoil";
import { postOrPatchRequest } from "@/lib/utils/utils";
import { useGetCSRFToken } from "./useGetCSRFToken";

export const useSetView = <T,>(
  url: RequestInfo,
  recoilSetter: SetterOrUpdater<T>
) => {
  const { csrfToken, csrf } = useGetCSRFToken();
  const {
    isSuccess,
    mutate,
    data: serverView,
  } = useMutation(async (body: any) => {
    const response = await fetch(
      url,
      postOrPatchRequest(body, csrfToken, "POST")
    );
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
