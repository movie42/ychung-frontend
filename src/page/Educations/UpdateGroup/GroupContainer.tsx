import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import {
  Group as GroupProps,
  GroupInfo,
} from "../../../state/educationGroup.atom";
import { compare } from "../../../lib/utils/utilities/compare";
import { useForm } from "react-hook-form";
import usePostOrPatch from "../../../lib/utils/hooks/usePost";
import { FetchDataProps } from "@/lib/interfaces";
import { useGet } from "../../../lib/utils/hooks/useGet";
import { useParams } from "react-router";
import { useQueryClient } from "react-query";
import { MdAddCircle, MdArrowDropDown } from "react-icons/md";
import Group from "./Group";

import { Input } from "@/components";

const Wrapper = styled.div``;

const DragDropContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const DropableItemContainer = styled.div`
  .card {
    margin: 0 1rem;
  }
`;

const AddGroupContainer = styled.div`
  display: flex;
  align-items: center;
  height: 8rem;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  input {
    font-size: 2rem;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    padding-bottom: 1rem;
    outline: none;
  }
  .select-container {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 20rem;
    margin: 0 1rem;
    overflow: hidden;
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    padding-bottom: 1rem;
  }
  .arrow-drop-down {
    position: absolute;
    z-index: -1;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }

  select {
    box-sizing: border-box;
    background-color: unset;
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    outline: none;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button {
    cursor: pointer;
    border: 0;
    background-color: unset;
    font-size: 3rem;
    color: ${(props) => props.theme.color.gray300};
    &:hover {
      color: ${(props) => props.theme.color.primary300};
    }
  }
`;

interface SendGroupProps {
  _id?: string;
  name?: string;
  place?: string;
  type?: "student" | "worker" | "new" | "etc";
  humanIds?: string[];
}

interface IGroupContainerProps {
  groupInfo: GroupInfo | undefined;
}

const GroupContainer = ({ groupInfo }: IGroupContainerProps) => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<GroupProps>();
  const queryClient = useQueryClient();
  const {
    data: group,
    isLoading,
    isFetching,
  } = useGet<GroupProps[]>({
    url: `/api/education/groups/${id}/group`,
    queryKey: "groups",
    cacheTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const { mutate: updateGroupInfo } = usePostOrPatch<
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
    queryKey: "groupInfo",
    method: "PATCH",
  });

  const addGroup = handleSubmit((data) => {
    updateGroupInfo(data);
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

    if (group) {
      const [start] = group?.filter(
        (value) => value._id === source.droppableId
      );
      const [finish] = group?.filter(
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
              queryClient.invalidateQueries("people");
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
            queryClient.invalidateQueries("people");
          },
        }
      );
      updateGroup(
        { ...newFinish },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("groups");
            queryClient.invalidateQueries("people");
          },
        }
      );
    }
  };

  return (
    <Wrapper>
      <AddGroupContainer>
        <Header>
          <h2>그룹 추가</h2>
        </Header>
        <Form onSubmit={addGroup}>
          <Input
            type="text"
            placeholder="소그룹 이름"
            autoComplete="off"
            {...register("name", {
              required: "소그룹 이름은 반드시 입력해야합니다.",
            })}
          />
          <Input
            type="text"
            placeholder="소그룹 장소를 적으세요"
            autoComplete="off"
            {...register("place")}
          />
          <span className="select-container">
            <select {...register("type")}>
              <option value="student">학생</option>
              <option value="worker">직장</option>
              <option value="new">새신자</option>
              <option value="etc">기타</option>
            </select>
            <span className="arrow-drop-down">
              <MdArrowDropDown />
            </span>
          </span>
          <button>
            <MdAddCircle />
          </button>
        </Form>
      </AddGroupContainer>
      <DropableItemContainer>
        <DragDropContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {groupInfo &&
              group?.filter((value) => value.type === "new").length !== 0 && (
                <div className="card">
                  <h1>새신자</h1>
                  {group
                    ?.filter((value) => value.type === "new")
                    .map((group) => (
                      <Group key={group._id} item={group} />
                    ))}
                </div>
              )}
            {groupInfo &&
              group?.filter((value) => value.type === "student").length !==
                0 && (
                <div className="card">
                  <h1>학생</h1>
                  {group
                    ?.filter((value) => value.type === "student")
                    .map((group) => (
                      <Group key={group._id} item={group} />
                    ))}
                </div>
              )}
            {groupInfo &&
              group?.filter((value) => value.type === "worker").length !==
                0 && (
                <div className="card">
                  <h1>직장</h1>
                  {group
                    ?.filter((value) => value.type === "worker")
                    .map((group) => (
                      <Group key={group._id} item={group} />
                    ))}
                </div>
              )}
            {groupInfo &&
              group?.filter((value) => value.type === "etc").length !== 0 && (
                <div className="card">
                  <h1>기타</h1>
                  {group
                    ?.filter((value) => value.type === "etc")
                    .map((group) => (
                      <Group key={group._id} item={group} />
                    ))}
                </div>
              )}
          </DragDropContext>
        </DragDropContainer>
      </DropableItemContainer>
    </Wrapper>
  );
};

export default GroupContainer;
