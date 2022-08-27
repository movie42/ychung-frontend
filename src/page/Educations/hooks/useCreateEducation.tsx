import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar, useTokenErrorHandler } from "@/lib/hooks";
import { groupInfoState } from "@/lib/state";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { EducationCreateData, EducationCreateVariable } from "./interface";

const useEducationCreate = () => {
  const navigate = useNavigate();
  const setGroupInfo = useSetRecoilState(groupInfoState);
  const queryClient = useQueryClient();
  const { handleAddSnackBar } = useSetSnackBar();
  const { redirectLogoutPage } = useTokenErrorHandler();
  return useMutation<
    { data: EducationCreateData },
    AxiosError,
    EducationCreateVariable
  >(["educations"], (body) => api.postData("/api/education/groups", body), {
    onSuccess: ({ data }) => {
      setGroupInfo(data);
      handleAddSnackBar({
        message: snackbarStatusCode[200],
        type: "success",
      });
      queryClient.invalidateQueries("group");
      queryClient.invalidateQueries("groups");
      queryClient.invalidateQueries("people");
      navigate(`/education/groups/${data?._id}/update`);
    },
    onError: (error) => {
      redirectLogoutPage(error);
    },
  });
};

export default useEducationCreate;
