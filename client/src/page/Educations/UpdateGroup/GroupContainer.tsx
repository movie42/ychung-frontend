import React, { useEffect, useState } from "react";
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
  groupInfoState,
  Group as GroupProps,
  groupsState,
} from "../../../state/educationGroup.atom";
import { compare } from "../../../utils/utilities/compare";
import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { FetchDataProps } from "../../../lib/interface";
import { useGet } from "../../../utils/customhooks/useGet";
import { useParams } from "react-router";
import { useQueryClient } from "react-query";

const DragDropContainer = styled.div`
  display: flex;
`;

interface SendGroupProps {
  _id?: string;
  name?: string;
  type?: "student" | "worker" | "new" | "etc";
  humanIds?: string[];
}
const GroupContainer = () => {
  const { id } = useParams();
  const groupInfo = useRecoilValue(groupInfoState);
  const [groupId, setGroupId] = useState("");
  const [group, setGroup] = useRecoilState(groupsState);
  const [people, setPeople] = useRecoilState(peopleState);
  const { register, handleSubmit, reset } = useForm<GroupProps>();
  const queryClient = useQueryClient();

  const { data } = useGet<GroupProps[]>({
    url: `/api/education/groups/${id}/group`,
    queryKey: "groups",
    onSuccess: (response) => {
      if (response) {
        setGroup(response);
      }
    },
  });

  const { mutate } = usePostOrPatch<
    FetchDataProps<GroupProps>,
    Error,
    GroupProps
  >({
    url: `/api/education/groups/${id}/group`,
    queryKey: "groups",
    method: "POST",
  });

  const { mutate: updateGroup } = usePostOrPatch<
    FetchDataProps<GroupProps>,
    Error,
    SendGroupProps
  >({
    url: `/api/education/group/update`,
    queryKey: "",
    method: "PATCH",
  });

  const addGroup = handleSubmit((data) => {
    mutate(data);
    reset();
  });

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
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
    const [start] = group.filter((value) => value._id === source.droppableId);
    const [finish] = group.filter(
      (value) => value._id === destination.droppableId
    );
    if (start._id === finish._id) {
      const newHunamIdsGroup = Array.from(start.humanIds);
      newHunamIdsGroup.splice(source.index, 1);
      newHunamIdsGroup.splice(destination.index, 0, draggableId);

      const newGroup = {
        ...start,
        humanIds: newHunamIdsGroup,
      };
      updateGroup(
        { ...newGroup },
        {
          onSuccess: (response) => {
            queryClient.invalidateQueries("groups");
            queryClient.invalidateQueries(["people", response.data?._id]);
          },
        }
      );
      return;
    }

    const startHunamIdsGroup = Array.from(start.humanIds);
    startHunamIdsGroup.splice(source.index, 1);
    const newStart = {
      ...start,
      humanIds: startHunamIdsGroup,
    };

    const finishHunamIdsGroup = Array.from(finish.humanIds);
    finishHunamIdsGroup.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      humanIds: finishHunamIdsGroup,
    };

    updateGroup(
      { ...newStart },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("groups");
          queryClient.invalidateQueries(["people", newStart._id]);
          queryClient.invalidateQueries(["people", newFinish._id]);
        },
      }
    );
    updateGroup(
      { ...newFinish },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("groups");
          queryClient.invalidateQueries(["people", newStart._id]);
          queryClient.invalidateQueries(["people", newFinish._id]);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={addGroup}>
        <Input type="text" {...register("name")} />
        <select {...register("type")}>
          <option value="student">학생</option>
          <option value="worker">직장</option>
          <option value="new">새신자</option>
          <option value="etc">기타</option>
        </select>
        <button>소그룹 추가하기</button>
      </form>

      <DragDropContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {groupInfo &&
            group?.filter((value) => value.type === "new").length !== 0 && (
              <div>
                <h1>새신자</h1>
                {group
                  ?.filter((value) => value.type === "new")
                  .map((group) => (
                    <>
                      <Group key={group._id} item={group} />
                    </>
                  ))}
              </div>
            )}
          {groupInfo &&
            group?.filter((value) => value.type === "student").length !== 0 && (
              <div>
                <h1>학생</h1>
                {group
                  ?.filter((value) => value.type === "student")
                  .map((group) => (
                    <>
                      <Group key={group._id} item={group} />
                    </>
                  ))}
              </div>
            )}
          {groupInfo &&
            group?.filter((value) => value.type === "worker").length !== 0 && (
              <div>
                <h1>직장</h1>
                {group
                  ?.filter((value) => value.type === "worker")
                  .map((group) => (
                    <>
                      <Group key={group._id} item={group} />
                    </>
                  ))}
              </div>
            )}
          {groupInfo &&
            group?.filter((value) => value.type === "etc").length !== 0 && (
              <div>
                <h1>기타</h1>
                {group
                  ?.filter((value) => value.type === "etc")
                  .map((group) => (
                    <>
                      <Group key={group._id} item={group} />
                    </>
                  ))}
              </div>
            )}
        </DragDropContext>
      </DragDropContainer>
    </>
  );
};

export default GroupContainer;
