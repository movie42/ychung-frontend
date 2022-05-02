import React, { useEffect } from "react";
import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { educationGroups } from "../../state/educationGroup.atom";
import { usePostData } from "../../utils/customhooks/usePostData";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

function EducationCreate() {
  const navigate = useNavigate();
  const setGroupsState = useSetRecoilState(educationGroups);
  const { mutationHandler, isSuccess, data, isLoading } = usePostData(
    "/api/education/group"
  );

  useEffect(() => {
    mutationHandler({ title: "소그룹1", isPublic: false, groups: [] });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.group);
      setGroupsState({ ...data.group });
      navigate(`/education/${data.group._id}/update`);
    }
  }, [isSuccess]);

  return <Wrapper>{!isLoading && <Loading />}</Wrapper>;
}

export default EducationCreate;
