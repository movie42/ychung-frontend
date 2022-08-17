import { API } from "@/lib/api";
import { groupInfoState } from "@/state";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { EducationCreateData, EducationCreateVariable } from "./interface";

const useEducationCreate = () => {
  const navigate = useNavigate();
  const setGroupInfo = useSetRecoilState(groupInfoState);
  const queryClient = useQueryClient();
  const api = new API();

  return useMutation<EducationCreateData, Error, EducationCreateVariable>(
    ["educations"],
    (body) => api.postData("/api/education/groups", body),
    {
      onSuccess: (response) => {
        setGroupInfo(response);
        setTimeout(
          () => navigate(`/education/groups/${response?._id}/update`),
          3000
        );
        queryClient.invalidateQueries("group");
        queryClient.invalidateQueries("groups");
        queryClient.invalidateQueries("people");
      },
    }
  );
};

export default useEducationCreate;
