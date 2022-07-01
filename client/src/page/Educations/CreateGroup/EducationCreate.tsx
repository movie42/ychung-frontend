import React, { useEffect } from "react";
import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { GroupInfo, groupInfoState } from "../../../state/educationGroup.atom";
import { useNavigate } from "react-router";
import usePostOrPatch from "../../../utils/hooks/usePost";
import { FetchDataProps } from "../../../lib/interface";
import { useQueryClient } from "react-query";

import { Loading } from "@/components";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

interface CreateGroup {
  title: string;
  isPublic: boolean;
  groups: [];
}

function EducationCreate() {
  const navigate = useNavigate();
  const setGroupInfo = useSetRecoilState(groupInfoState);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostOrPatch<
    FetchDataProps<GroupInfo>,
    Error,
    CreateGroup
  >({
    url: "/api/education/groups",
    queryKey: "educations",
    method: "POST",
  });

  useEffect(() => {
    const postDelay = setTimeout(() => {
      mutate(
        { title: "소그룹1", isPublic: false, groups: [] },
        {
          onSuccess: (response) => {
            const { data } = response;
            if (data) {
              setGroupInfo(data);
              setTimeout(
                () => navigate(`/education/groups/${data?._id}/update`),
                3000
              );
              queryClient.invalidateQueries("group");
              queryClient.invalidateQueries("groups");
              queryClient.invalidateQueries("people");
            }
          },
        }
      );
    }, 3000);

    return () => clearTimeout(postDelay);
  }, []);

  return <Wrapper>{!isLoading && <Loading />}</Wrapper>;
}

export default EducationCreate;
