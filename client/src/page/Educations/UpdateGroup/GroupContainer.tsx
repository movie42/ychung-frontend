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
  peopleState,
  groupState,
  groupInfoState,
  Group as GroupProps,
} from "../../../state/educationGroup.atom";
import { compare } from "../../../utils/utilities/compare";
import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";

const DragDropContainer = styled.div`
  display: flex;
`;

const GroupContainer = () => {
  const [groupInfo, setGroupInfo] = useRecoilState(groupInfoState);
  const [group, setGroup] = useRecoilState(groupState);
  const [people, setPeople] = useRecoilState(peopleState);
  const { register, handleSubmit, reset } = useForm<GroupProps>();

  // const [mutationHandler, isSuccess, data, isLoading] = usePostData(
  //   "/api/education/group"
  // );

  // const addGroup = handleSubmit((data) => {
  //   // mutationHandler(data);
  //   reset();
  // });

  // const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
  //   const { destination, source, draggableId } = result;
  //   if (!destination) {
  //     return;
  //   }
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  //   const [start] = group.filter((value) => value.id === source.droppableId);
  //   const [finish] = group.filter(
  //     (value) => value.id === destination.droppableId
  //   );
  //   if (start.id === finish.id) {
  //     const newHunamIdsGroup = Array.from(start.humanIds);
  //     newHunamIdsGroup.splice(source.index, 1);
  //     newHunamIdsGroup.splice(destination.index, 0, draggableId);
  //     const newGroup = {
  //       ...start,
  //       humanIds: newHunamIdsGroup,
  //     };
  //     const preState = group.filter((value) => value.id === draggableId);
  //     const newState = [...preState, newGroup].sort(compare);
  //     setGroup(newState);
  //     return;
  //   }

  //   const startHunamIdsGroup = Array.from(start.humanIds);
  //   startHunamIdsGroup.splice(source.index, 1);
  //   const newStart = {
  //     ...start,
  //     humanIds: startHunamIdsGroup,
  //   };
  //   const finishHunamIdsGroup = Array.from(finish.humanIds);
  //   finishHunamIdsGroup.splice(destination.index, 0, draggableId);
  //   const newFinish = {
  //     ...finish,
  //     humanIds: finishHunamIdsGroup,
  //   };
  //   const [newPerson] = people.filter((value) => value.id === draggableId);
  //   const prePeople = people.filter((value) => value.id !== draggableId);

  //   const newPersonState = {
  //     ...newPerson,
  //     type: finish.type,
  //   };

  //   setPeople([...prePeople, newPersonState]);
  //   const preState = group.filter(
  //     (value) => value.id !== start.id && value.id !== finish.id
  //   );
  //   const newState = [...preState, newStart, newFinish].sort(compare);
  //   setGroup(newState);
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     const { group: newGroup } = data;
  //     setGroup((pre) => [...pre, newGroup]);
  //   }
  // }, [isSuccess]);

  // return (
  //   <>
  //     <form onSubmit={addGroup}>
  //       <Input type="text" />
  //       <select {...register("type")}>
  //         <option value="student">학생</option>
  //         <option value="worker">직장</option>
  //         <option value="new">새신자</option>
  //         <option value="etc">기타</option>
  //       </select>
  //       <button>소그룹 추가하기</button>
  //     </form>

  //     <DragDropContainer>
  //       <DragDropContext onDragEnd={onDragEnd}>
  //         {groupInfo &&
  //           group?.filter((value) => value.type === "new").length !== 0 && (
  //             <div>
  //               <h1>새신자</h1>
  //               {group
  //                 ?.filter((value) => value.type === "new")
  //                 .map((group) => (
  //                   <>
  //                     <Group key={group.id} item={group} />
  //                   </>
  //                 ))}
  //             </div>
  //           )}
  //         {groupInfo &&
  //           group?.filter((value) => value.type === "student").length !== 0 && (
  //             <div>
  //               <h1>학생</h1>
  //               {group
  //                 ?.filter((value) => value.type === "student")
  //                 .map((group) => (
  //                   <>
  //                     <Group key={group.id} item={group} />
  //                   </>
  //                 ))}
  //             </div>
  //           )}
  //         {groupInfo &&
  //           group?.filter((value) => value.type === "worker").length !== 0 && (
  //             <div>
  //               <h1>직장</h1>
  //               {group
  //                 ?.filter((value) => value.type === "worker")
  //                 .map((group) => (
  //                   <>
  //                     <Group key={group.id} item={group} />
  //                   </>
  //                 ))}
  //             </div>
  //           )}
  //         {groupInfo &&
  //           group?.filter((value) => value.type === "etc").length !== 0 && (
  //             <div>
  //               <h1>기타</h1>
  //               {group
  //                 ?.filter((value) => value.type === "etc")
  //                 .map((group) => (
  //                   <>
  //                     <Group key={group.id} item={group} />
  //                   </>
  //                 ))}
  //             </div>
  //           )}
  //       </DragDropContext>
  //     </DragDropContainer>
  //   </>
  // );
  return null;
};

export default GroupContainer;
