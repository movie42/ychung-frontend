import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Human from "./Human/Human";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  groupsState,
  groupInfoState,
  People,
  peopleState,
  Group as GroupProps,
} from "../../../state/educationGroup.atom";
import { useForm } from "react-hook-form";
import { compare } from "../../../utils/utilities/compare";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { useGet } from "../../../utils/customhooks/useGet";
import { FetchDataProps } from "../../../lib/interface";

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

const PersonList = styled.div<{ isDraggingOver: boolean }>`
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.color.primary300
      : props.theme.color.background100};
  flex-grow: 1;
  min-height: 100px;
`;

interface IGroupProps {
  item: GroupProps;
}

interface SendPeople {
  name: string;
  type: "student" | "worker" | "new" | "etc";
}

const Group = ({ item }: IGroupProps) => {
  const { register, handleSubmit, reset } = useForm<People>();
  const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);
  const [people, setPeople] = useState<People[]>();

  const { data } = useGet<People[]>({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
    onSuccess: (response) => {
      setPeople(response);
    },
  });

  const { mutate } = usePostOrPatch<
    FetchDataProps<People[]>,
    Error,
    SendPeople
  >({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
    method: "POST",
  });

  const openAddPeopleInput = () => {
    setIsOpenPeopleInput(!isOpenPeopleInput);
  };

  const onSubmitData = handleSubmit((data) => {
    mutate({
      name: data.name,
      type: item.type,
    });
  });

  return (
    <Container>
      {isOpenPeopleInput && (
        <form onSubmit={onSubmitData}>
          <label htmlFor="name">참가자 추가</label>
          <input id="name" type="text" {...register("name")} />
        </form>
      )}
      <button onClick={openAddPeopleInput}>참가자</button>
      <Title>{item.name}</Title>
      <Droppable droppableId={item._id}>
        {(provided, snapshot) => (
          <PersonList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {people?.map((person, index) => (
              <Human key={person._id} index={index} person={person} />
            ))}
            {provided.placeholder}
          </PersonList>
        )}
      </Droppable>
    </Container>
  );
};

export default Group;
