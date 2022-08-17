import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface IuseDeleteGroupInfoProps {}

const useDeleteGroupInfo = () => {
  const api = new API();
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  return useMutation(
    (id: string) => api.deleteData(`/api/education/groups/${id}`),
    {
      onSuccess: () => {
        queryclient.invalidateQueries(["groupInfo"]);
        navigate("/education");
      },
    }
  );
};

export default useDeleteGroupInfo;
