import React, { useEffect } from "react";
import styled from "styled-components";
import Group from "./Group";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import Input from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import {
  educationGroup,
  EducationGroupData,
  educationGroups,
  peopleState,
} from "../../state/educationGroup.atom";
import { usePostData } from "../../utils/customhooks/usePostData";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const DragDropContainer = styled.div`
  display: flex;
`;

function EducationUpdate() {
  const [groupsState, setGroupsState] = useRecoilState(educationGroups);
  const [groupState, setGroupState] = useRecoilState(educationGroup);
  const [people, setPeople] = useRecoilState(peopleState);
  const { register, handleSubmit, reset } = useForm<EducationGroupData>();

  const addGroup = handleSubmit((data) => {
    setGroupState((pre) => [
      ...pre,
      // { name: data.name, type: data.type, humanIds: [] },
    ]);

    reset();
  });

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const [start] = groupsState.groups.filter(
      (value) => value.id === source.droppableId
    );
    const [finish] = groupsState.groups.filter(
      (value) => value.id === destination.droppableId
    );

    if (start.id === finish.id) {
      const newHunamIdsGroup = Array.from(start.humanIds);
      newHunamIdsGroup.splice(source.index, 1);
      newHunamIdsGroup.splice(destination.index, 0, draggableId);
      const newGroup = {
        ...start,
        humanIds: newHunamIdsGroup,
      };

      const preState = groupsState.groups.filter(
        (value) => value.id === draggableId
      );
      const newState = [...preState, newGroup];
      // setGroupState((pre) => ({ ...pre, group: newState }));
      return;
    }
    const startHunamIdsGroup = Array.from(start.humanIds);
    startHunamIdsGroup.splice(source.index, 1);
    const newStart = {
      ...start,
      humanIds: startHunamIdsGroup,
    };
    const finishHunamIdsGroup = Array.from(finish.humanIds);
    finishHunamIdsGroup.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      humanIds: finishHunamIdsGroup,
    };
    const [newPerson] = people.filter((value) => value.id === draggableId);
    const prePeople = people.filter((value) => value.id !== draggableId);

    const newPersonState = {
      ...newPerson,
      type: finish.type,
    };

    setPeople([...prePeople, newPersonState]);
    const preState = groupsState.groups.filter(
      (value) => value.id !== start.id && value.id !== finish.id
    );
    const newState = [...preState, newStart, newFinish];
    // setGroupState((pre) => ({ ...pre, group: newState }));
  };

  const toggleButton = () => {};

  useEffect(() => {
    console.log(groupsState);
  }, []);

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
      <DragDropContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {groupsState.groups &&
            groupsState.groups?.filter((value) => value.type === "new")
              .length !== 0 && (
              <div>
                <h1>새신자</h1>
                {groupsState.groups
                  ?.filter((value) => value.type === "new")
                  .map((group) => (
                    <>
                      <Group key={group.id} group={group} />
                    </>
                  ))}
              </div>
            )}
          {groupsState.groups &&
            groupsState.groups?.filter((value) => value.type === "student")
              .length !== 0 && (
              <div>
                <h1>학생</h1>
                {groupsState.groups
                  ?.filter((value) => value.type === "student")
                  .map((group) => (
                    <>
                      <Group key={group.id} group={group} />
                    </>
                  ))}
              </div>
            )}
          {groupsState.groups &&
            groupsState.groups?.filter((value) => value.type === "worker")
              .length !== 0 && (
              <div>
                <h1>직장</h1>
                {groupsState.groups
                  ?.filter((value) => value.type === "worker")
                  .map((group) => (
                    <>
                      <Group key={group.id} group={group} />
                    </>
                  ))}
              </div>
            )}
          {groupsState.groups &&
            groupsState.groups?.filter((value) => value.type === "etc")
              .length !== 0 && (
              <div>
                <h1>기타</h1>
                {groupsState.groups
                  ?.filter((value) => value.type === "etc")
                  .map((group) => (
                    <>
                      <Group key={group.id} group={group} />
                    </>
                  ))}
              </div>
            )}
        </DragDropContext>
      </DragDropContainer>
    </Wrapper>
  );
}

export default EducationUpdate;
