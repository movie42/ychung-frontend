import React from "react";
import styled from "styled-components";

import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import { groupInfoState, Group } from "../../../state/educationGroup.atom";
import GroupContainer from "./GroupContainer";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

function EducationUpdate() {
  // const { id } = useParams();
  // const [groupInfo, setGroupInfo] = useRecoilState(groupInfoState);
  // const { register, handleSubmit, reset } = useForm<Group>();
  // const [groupInfoMutation, isSuccess, data, isLoading] = usePostData(
  //   `/api/education/groups/${id}`
  // );

  const toggleButton = () => {
    // groupInfoMutation({ ...groupInfo, isPublic: !groupInfo.isPublic });
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     const { updateGroups } = data;
  //     setGroupInfo((pre) => ({ ...pre, isPublic: updateGroups.isPublic }));
  //   }
  // }, [isSuccess]);
  return null;
  // return (
  //   <Wrapper>
  //     <Input
  //       type="text"
  //     />
  //     <button onClick={toggleButton}>소그룹 공개하기</button>
  //     <div>{`${groupInfo.isPublic}`}</div>
  //     <GroupContainer />
  //   </Wrapper>
  // );
}

export default EducationUpdate;
