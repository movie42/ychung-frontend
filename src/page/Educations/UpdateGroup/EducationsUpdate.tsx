import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import {
  educationGroup,
  EducationGroupData,
  educationGroups,
  peopleState,
} from "../../../state/educationGroup.atom";
import GroupContainer from "./GroupContainer";
import { usePostData } from "../../../utils/customhooks/usePostData";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

function EducationUpdate() {
  const { id } = useParams();
  const [groupsState, setGroupsState] = useRecoilState(educationGroups);
  const [groupState, setGroupState] = useRecoilState(educationGroup);
  const [people, setPeople] = useRecoilState(peopleState);

  const { register, handleSubmit, reset } = useForm<EducationGroupData>();

  const [mutationHandler, isSuccess, data, isLoading] = usePostData(
    "/api/education/group"
  );

  const addGroup = handleSubmit((data) => {
    mutationHandler(data);
    reset();
  });

  const toggleButton = () => {};

  useEffect(() => {
    if (isSuccess) {
      const { _id: id, name, humanIds, type } = data.group;
      setGroupState((pre) => [...pre, { id, name, humanIds, type }]);
    }
  }, [isSuccess]);

  return (
    <Wrapper>
      {/* 눌렀을 때, Input으로 변하기 */}
      <Input
        type="text"
        register={register}
        registerName="title"
        defaultValue="소그룹1"
      />
      {/* toggle 버튼으로 변경하기 */}
      <button onClick={toggleButton}>소그룹 공개하기</button>
      <form onSubmit={addGroup}>
        <Input type="text" register={register} registerName={"name"} />
        <select {...register("type")}>
          <option value="student">학생</option>
          <option value="worker">직장</option>
          <option value="new">새신자</option>
          <option value="etc">기타</option>
        </select>
        <button>소그룹 추가하기</button>
      </form>
      <GroupContainer />
    </Wrapper>
  );
}

export default EducationUpdate;
