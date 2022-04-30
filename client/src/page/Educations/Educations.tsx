import React, { BaseSyntheticEvent, useRef, useState } from "react";
import styled from "styled-components";
import Group from "./Group";
import {
  DragDropContext,
  DragUpdate,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import Input from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { educationGroup } from "../../state/educationGroup.atom";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const DragDropContainer = styled.div`
  display: flex;
`;

function Educations() {
  const inputRef = useRef();
  const [groupState, setGroupState] = useRecoilState(educationGroup);
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  const addGroup = handleSubmit((data) => {
    const id = String(Date.now());

    setGroupState((pre) => [
      ...pre,
      { id, name: data.name, type: "student", humanIds: [] },
    ]);
  });

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;

    // if (!destination) {
    //   return;
    // }

    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }

    // const start = state.[source.droppableId];
    // const finish = state.[destination.droppableId];

    // if (start === finish) {
    //   const newHunamIdsGroup = start && Array.from(start.humanIds);
    //   newHunamIdsGroup?.splice(source.index, 1);
    //   newHunamIdsGroup?.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...start,
    //     humanIds: newHunamIdsGroup,
    //   };

    //     const newState = {
    //       ...state,
    //       group: { ...state, [newColumn.id]: newHunamIdsGroup },
    //     };

    //   setState(newState);
    //   return;
    // }

    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };
    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };

    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };

    // setState(newState);
  };

  return (
    <Wrapper>
      <form onSubmit={addGroup}>
        <Input register={register} registerName={"name"} />
        <button>소그룹 추가하기</button>
      </form>
      <DragDropContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {groupState.map((group) => (
            <>
              <Group key={group.id} group={group} />
            </>
          ))}
        </DragDropContext>
      </DragDropContainer>
    </Wrapper>
  );
}

export default Educations;
