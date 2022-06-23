import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Human from "./Human/Human";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  groupState,
  groupInfoState,
  People,
  peopleState,
  Group as GroupProps,
} from "../../../state/educationGroup.atom";
import { useForm } from "react-hook-form";
import { compare } from "../../../utils/utilities/compare";

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

const Group = ({ item }: IGroupProps) => {
  const { register, handleSubmit, reset } = useForm<People>();
  const [addPeopleInput, setPeopleInput] = useState(false);

  const [people, setPeople] = useRecoilState(peopleState);
  const [groupInfo, setGroupInfo] = useRecoilState(groupInfoState);
  const [group, setGroup] = useRecoilState(groupState);

  // const [mutationHandler, isSuccess, data, isLoading] = usePostData(
  //   "/api/education/people"
  // );

  const openAddPeopleInput = () => {
    setPeopleInput(!addPeopleInput);
  };

  const onSubmitData = handleSubmit((data) => {
    // mutationHandler({
    //   name: data.name,
    //   type: group.type,
    //   groupIds: [group.id],
    // });
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     const { _id: id, name, type, groupIds } = data.people;
  //     setPeople((pre) => [...pre, { id, name, type, groupIds }]);
  //     // setGroup((pre) =>
  //     //   [
  //     //     ...pre.filter((value) => value.id !== group.id),
  //     //     { ...group, humanIds: [...group.humanIds, data.people._id] },
  //     //   ].sort(compare)
  //     // );
  //   }
  // }, [isSuccess]);

  // useEffect(() => {
  //   console.log(groupInfo);
  // }, [groupInfo]);

  // return (
  //   <Container>
  //     {addPeopleInput && (
  //       <form onSubmit={onSubmitData}>
  //         <label htmlFor="name">참가자 추가</label>
  //         <input id="name" type="text" {...register("name")} />
  //       </form>
  //     )}
  //     <button onClick={openAddPeopleInput}>참가자</button>
  //     <Title>{item.name}</Title>
  //     <Droppable droppableId={item.id}>
  //       {(provided, snapshot) => (
  //         <PersonList
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //           isDraggingOver={snapshot.isDraggingOver}>
  //           {/* {group.humanIds.map((humanId, index) => (
  //             <Human key={humanId} index={index} humanId={humanId} />
  //           ))} */}
  //           {provided.placeholder}
  //         </PersonList>
  //       )}
  //     </Droppable>
  //   </Container>
  // );
  return null;
};

export default Group;
