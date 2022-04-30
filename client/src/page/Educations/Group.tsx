import React, { useState } from "react";
import styled from "styled-components";
import Human from "./Human";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  educationGroup,
  EducationGroupData,
} from "../../state/educationGroup.atom";

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.color.gray300};
  padding: 1rem;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 2.2rem;
  padding: 1rem;
`;

const TaskList: React.FC<
  | { isDraggingOver: boolean }
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = styled.div<{ isDraggingOver: boolean }>`
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.color.primary300
      : props.theme.color.background100};
  flex-grow: 1;
  min-height: 100px;
`;

interface IColumnProps {
  group: EducationGroupData;
}

const Group = ({ group }: IColumnProps) => {
  const [columnState, setState] = useRecoilState(educationGroup);
  console.log(group);
  return (
    <Container>
      <Title>{group.name}</Title>
      <Droppable droppableId={group.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {group.humanIds.map((humanId, index) => (
              <Human key={humanId} index={index} humanId={humanId} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Group;
