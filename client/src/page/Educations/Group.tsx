import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Human from "./Human";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  educationGroup,
  EducationGroupData,
  People,
  peopleState,
} from "../../state/educationGroup.atom";
import { useForm } from "react-hook-form";

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

const PersonList: React.FC<
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
  const { register, handleSubmit, reset } = useForm<People>();
  const [addPeopleInput, setPeopleInput] = useState(false);
  const setPeople = useSetRecoilState(peopleState);
  const [groups, setGroups] = useRecoilState(educationGroup);

  const openAddPeopleInput = () => {
    setPeopleInput(!addPeopleInput);
  };

  const addPeople = handleSubmit((data) => {
    const id = String(Date.now());
    setPeople((pre) => [
      ...pre,
      { id, name: data.name, groupId: group.id, type: group.type },
    ]);

    setGroups((pre) => [
      ...pre.filter((value) => value.id !== group.id),
      { ...group, humanIds: [...group.humanIds, id] },
    ]);

    reset();
  });

  return (
    <Container>
      {addPeopleInput && (
        <form onSubmit={addPeople}>
          <label htmlFor="name">참가자 추가</label>
          <input id="name" type="text" {...register("name")} />
        </form>
      )}
      <button onClick={openAddPeopleInput}>참가자</button>
      <Title>{group.name}</Title>
      <Droppable droppableId={group.id}>
        {(provided, snapshot) => (
          <PersonList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {group.humanIds.map((humanId, index) => (
              <Human key={humanId} index={index} humanId={humanId} />
            ))}
            {provided.placeholder}
          </PersonList>
        )}
      </Droppable>
    </Container>
  );
};

export default Group;
