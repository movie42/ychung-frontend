import React, { useEffect } from "react";
import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { groupInfoState } from "../../../state/educationGroup.atom";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

function EducationCreate() {
  // const navigate = useNavigate();
  // const setGroupInfo = useSetRecoilState(groupInfoState);
  // const [mutationHandler, isSuccess, data, isLoading] = usePostData(
  //   "/api/education/groups"
  // );

  // useEffect(() => {
  //   mutationHandler({ title: "소그룹1", isPublic: false, groups: [] });
  // }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setGroupInfo({ ...data.groups });
  //     navigate(`/education/groups/${data.groups._id}/update`);
  //   }
  // }, [isSuccess]);

  // return <Wrapper>{!isLoading && <Loading />}</Wrapper>;
  return null;
}

export default EducationCreate;
