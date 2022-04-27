import React, { useState } from "react";
import styled from "styled-components";
import Column from "./Column";
import {
  DragDropContext,
  DragUpdate,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { InitialData, initialData } from "./initialData";

const Wrapper = styled.div`
  display: flex;
  margin-top: 8rem;
`;

const TaskList = styled.div`
  padding: 0.8rem;
`;

function Educations() {
  const [state, setState] = useState<InitialData>(initialData);

  const column = state.columnOrder.map((columnsId) => state.columns[columnsId]);

  // const onDragStart = () => {
  //   document.body.style.color = "red";
  //   document.body.style.transition = "background-color 0.2s ease";
  // };

  // const onDragUpdate = (update: DragUpdate) => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(state.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  // };

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {column.map((value) => (
          <>
            <Column key={value.id} column={value} state={state} />
          </>
        ))}
      </Wrapper>
    </DragDropContext>
  );
}

export default Educations;
