import React, { useEffect } from "react";
import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { GroupInfo, groupInfoState } from "../../../state/educationGroup.atom";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { FetchDataProps } from "../../../lib/interface";

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
  const { mutate, isSuccess, data, isLoading } = usePostOrPatch<
    FetchDataProps<GroupInfo>,
    Error,
    CreateGroup
  >({
    url: "/api/education/groups",
    queryKey: "educations",
    method: "POST",
  });

  useEffect(() => {
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
          }
        },
      }
    );
  }, []);

  return <Wrapper>{!isLoading && <Loading />}</Wrapper>;
}

export default EducationCreate;
