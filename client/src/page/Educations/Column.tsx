import React, { useState } from "react";
import styled from "styled-components";
import { InitialData, initialData } from "./initialData";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

interface IColumnProps {
  state: InitialData;
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

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

const Column = ({ state, column }: IColumnProps) => {
  const [columnState, setState] = useState<InitialData>(state);
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {column.taskIds.map((taskId, index) => (
              <Task
                key={taskId}
                index={index}
                task={columnState.tasks[taskId]}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
