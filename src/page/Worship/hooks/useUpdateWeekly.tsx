import { api, snackbarStatusCode } from "@/lib/api";
import { useSetSnackBar } from "@/lib/hooks";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface WeeklyUpdateBody {
  _id: string;
  title: string;
  word: string;
  chapter: number;
  verse: number;
  verse_end: number;
  pastor: string;
  worshipTeam: string;
  prayer: string;
  advertisement: string;
  reader: string;
  offering: string;
  benediction: string;
  creator: {
    _id: string;
    userName: string;
  };
  views: number;
  createdAt: string;
}
interface WeeklyUpdateData {
  data: WeeklyUpdateBody;
}

interface WeeklyUpdateVariable {
  id: string;
  body: WeeklyUpdateBody;
}

const useUpdateWeekly = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleAddSnackBar } = useSetSnackBar();

  return useMutation<WeeklyUpdateData, Error, WeeklyUpdateVariable>(
    ({ id, body }) => api.postData(`/api/worship/${id}`, body),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["weeklies"]);
        handleAddSnackBar({
          message: snackbarStatusCode[202],
          type: "success",
        });
        navigate(`/worship/${data._id}`, {
          replace: true,
        });
      },
    }
  );
};

export default useUpdateWeekly;
