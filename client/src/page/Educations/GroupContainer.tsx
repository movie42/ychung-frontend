import React, { useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import Group from "./Group";
import {
  educationGroup,
  educationGroups,
  peopleState,
} from "../../state/educationGroup.atom";
import { compare } from "../../utils/utilities/compare";

const DragDropContainer = styled.div`
  display: flex;
`;

const GroupContainer = () => {
  const [groupsState, setGroupsState] = useRecoilState(educationGroups);
  const [groupState, setGroupState] = useRecoilState(educationGroup);
  const [people, setPeople] = useRecoilState(peopleState);

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
    const [start] = groupState.filter(
      (value) => value.id === source.droppableId
    );
    const [finish] = groupState.filter(
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
      const preState = groupState.filter((value) => value.id === draggableId);
      const newState = [...preState, newGroup].sort(compare);
      setGroupState(newState);
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
    const preState = groupState.filter(
      (value) => value.id !== start.id && value.id !== finish.id
    );
    const newState = [...preState, newStart, newFinish].sort(compare);
    setGroupState(newState);
  };

  return (
    <DragDropContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {groupState &&
          groupState?.filter((value) => value.type === "new").length !== 0 && (
            <div>
              <h1>새신자</h1>
              {groupState
                ?.filter((value) => value.type === "new")
                .map((group) => (
                  <>
                    <Group key={group.id} group={group} />
                  </>
                ))}
            </div>
          )}
        {groupState &&
          groupState?.filter((value) => value.type === "student").length !==
            0 && (
            <div>
              <h1>학생</h1>
              {groupState
                ?.filter((value) => value.type === "student")
                .map((group) => (
                  <>
                    <Group key={group.id} group={group} />
                  </>
                ))}
            </div>
          )}
        {groupState &&
          groupState?.filter((value) => value.type === "worker").length !==
            0 && (
            <div>
              <h1>직장</h1>
              {groupState
                ?.filter((value) => value.type === "worker")
                .map((group) => (
                  <>
                    <Group key={group.id} group={group} />
                  </>
                ))}
            </div>
          )}
        {groupState &&
          groupState?.filter((value) => value.type === "etc").length !== 0 && (
            <div>
              <h1>기타</h1>
              {groupState
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
  );
};

export default GroupContainer;
