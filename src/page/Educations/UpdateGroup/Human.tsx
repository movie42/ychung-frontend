import React, { useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";

import { peopleState } from "../../../state/educationGroup.atom";
import { usePostData } from "../../../utils/customhooks/usePostData";

const Container: React.FC<
  | { isDragging: boolean }
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = styled.div<{
  isDragging: boolean;
}>`
  display: flex;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.color.gray300};
  margin-bottom: 0.4rem;
  background-color: ${(props) =>
    props.isDragging
      ? props.theme.color.secondary400
      : props.theme.color.background100};
`;

const Handle = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: orange;
  border-radius: 0.4rem;
  margin-right: 0.8rem;
`;

interface ITaskInterface
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index: number;
  humanId: string;
}

const Human = ({ humanId, index }: ITaskInterface) => {
  const people = useRecoilValue(peopleState);
  const [person] = people.filter((value) => value.id === humanId);
  const [mutationHandler, isSuccess, data, isLoading] = usePostData("");

  useEffect(() => {
    mutationHandler(people);
  }, [people]);

  return (
    <Draggable draggableId={person.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}>
          {person.name}
        </Container>
      )}
    </Draggable>
  );
};

export default Human;
