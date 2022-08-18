import { API, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { groupInfoState } from "@/lib/state";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { EducationCreateData, EducationCreateVariable } from "./interface";

const useEducationCreate = () => {
  const navigate = useNavigate();
  const setGroupInfo = useSetRecoilState(groupInfoState);
  const queryClient = useQueryClient();
  const api = new API();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<EducationCreateData, Error, EducationCreateVariable>(
    ["educations"],
    (body) => api.postData("/api/education/groups", body),
    {
      onSuccess: (response) => {
        setGroupInfo(response);
        handleAddSnackBar({
          message: snackbarStatusCode[200],
          type: "success",
        });
        queryClient.invalidateQueries("group");
        queryClient.invalidateQueries("groups");
        queryClient.invalidateQueries("people");
        navigate(`/education/groups/${response?._id}/update`);
      },
    }
  );
};

export default useEducationCreate;
