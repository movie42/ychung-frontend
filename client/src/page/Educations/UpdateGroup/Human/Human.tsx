import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { People, peopleState } from "../../../../state/educationGroup.atom";

const Container = styled.div<{
  isDragging: boolean;
}>`
  display: flex;
  padding: 1rem;
  /* border: 1px solid ${(props) => props.theme.color.gray300}; */
  margin-bottom: 0.4rem;
  background-color: ${(props) =>
    props.isDragging
      ? props.theme.color.secondary400
      : props.theme.color.background100};
`;

interface ITaskInterface {
  index: number;
  person: People;
}

const Human = ({ index, person }: ITaskInterface) => {
  return (
    <Draggable draggableId={person._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          key={person._id}
          ref={provided.innerRef}>
          {person.name}
        </Container>
      )}
    </Draggable>
  );
};

export default Human;
