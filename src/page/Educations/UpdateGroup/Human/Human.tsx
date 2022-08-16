import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { HiUser } from "react-icons/hi";

import { People } from "../../../../state/educationGroup.atom";
import {
  MdArrowDropDown,
  MdDelete,
  MdDragHandle,
  MdEdit,
} from "react-icons/md";
import usePostOrPatch from "../../../../lib/utils/hooks/usePost";
import { QueryClient, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import useDelete from "../../../../lib/utils/hooks/useDelete";
import { useGet } from "../../../../lib/utils/hooks/useGet";

import { ConfirmDeleteModal } from "@/components";

const Container = styled.div<{
  isDragging: boolean;
  isLeader: boolean;
}>`
  display: grid;
  grid-template-columns: 5fr 0.3fr;
  padding: 1rem;
  /* border: 1px solid ${(props) => props.theme.color.gray300}; */
  margin-bottom: 0.4rem;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 0.5rem;
  background-color: ${(props) => {
    return props.isDragging
      ? props.theme.color.primary700
      : !props.isLeader
      ? props.theme.color.background100
      : props.theme.color.primary900;
  }};
  color: ${(props) =>
    props.isDragging
      ? props.theme.color.fontColorWhite
      : !props.isLeader
      ? props.theme.color.fontColorBlack
      : props.theme.color.fontColorWhite};
  &:hover {
    background-color: ${(props) => props.theme.color.gray400};
    color: ${(props) => props.theme.color.fontColorWhite};
    .button-container {
      button {
        color: ${(props) => props.theme.color.fontColorWhite};
      }
    }
  }
  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.5rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    button {
      cursor: pointer;
      padding: 0 0.5rem;
      color: ${(props) => props.theme.color.gray300};
      border: 0;
      background-color: unset;
      &:hover {
        color: ${(props) => props.theme.color.primary300};
      }
    }
  }
  .isleader-container {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.2rem;
    border-radius: 0.2rem;
    strong {
      color: ${(props) => props.theme.color.fontColorWhite};
      &:hover {
        color: ${(props) => props.theme.color.fontColorWhite};
      }
    }
    &:hover {
      background-color: ${(props) => props.theme.color.primary300};
      color: ${(props) => props.theme.color.fontColorWhite};
    }
  }
`;

const Form = styled.form`
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    font-size: 1.8rem;
    border: 1px solid ${(props) => props.theme.color.gray300};
  }
  .select-container {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.color.gray300};
    padding: 1rem;
  }
  .arrow-drop-down {
    position: absolute;
    z-index: 1;
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
    margin: 0;
  }
`;

const PersonInfoContainer = styled.div`
  display: flex;
  align-items: center;
  h5 {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const ImageContainer = styled.div<{ sex: "male" | "female" }>`
  position: relative;
  overflow: hidden;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${(props) =>
    props.sex === "male"
      ? props.theme.color.primary500
      : props.theme.color.secondary500};
  margin-right: 1rem;
`;

const HumanIcon = styled(HiUser)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  color: ${(props) => props.theme.color.gray100};
`;

interface ITaskInterface {
  index: number;
  person: People;
  groupId: string;
}

const Human = ({ index, person, groupId }: ITaskInterface) => {
  const queryClient = useQueryClient();

  const [isUpdate, setIsUpdate] = useState(false);

  const { register, handleSubmit } = useForm<{
    name?: string;
    sex?: "male" | "female";
  }>();

  const { mutate: updatePeople } = usePostOrPatch({
    url: `/api/education/people/${person._id}`,
    queryKey: "people",
    method: "PATCH",
  });

  const {
    mutate: deletePeopleFromGroup,
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
  } = useDelete({
    url: `/api/education/group/${groupId}/people?person=${person._id}`,
    queryKey: "people",
    onSuccess: () => {
      queryClient.invalidateQueries("people");
    },
  });

  const toggleButton = () => {
    updatePeople({ isLeader: !person?.isLeader });
  };

  const onSubmitUpdatePeopleName = handleSubmit((data) => {
    updatePeople({ name: data.name, sex: data.sex });
    setIsUpdate(false);
  });

  const deletePeople = () => {
    setIsConfirmModal(true);
  };

  useEffect(() => {
    if (isDelete) {
      deletePeopleFromGroup();
    }
  }, [isDelete]);

  return (
    <>
      {isConfirmModal && (
        <ConfirmDeleteModal
          setIsDelete={setIsDelete}
          setIsConfirmModal={setIsConfirmModal}
          title="참가자를 삭제하시겠습니까?"
          subtitle="참가자는 그룹에서 삭제되지만 데이터는 그대로 남습니다. 완전히 삭제하려면 관리자에게 문의해주세요."
        />
      )}
      <Draggable draggableId={person._id} index={index}>
        {(provided, snapshot) => (
          <Container
            isLeader={person.isLeader}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            key={person._id}
            ref={provided.innerRef}>
            <div className="info-container">
              {!isUpdate ? (
                <>
                  <PersonInfoContainer>
                    <ImageContainer sex={person.sex}>
                      <HumanIcon />
                    </ImageContainer>
                    <h4>{person.name}</h4>
                  </PersonInfoContainer>
                  <div className="button-container">
                    <button onClick={() => setIsUpdate((pre) => !pre)}>
                      <MdEdit />
                    </button>
                    <button onClick={deletePeople}>
                      <MdDelete />
                    </button>
                    <div className="isleader-container" onClick={toggleButton}>
                      {person.isLeader ? <strong>리더!</strong> : "리더?"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Form onSubmit={onSubmitUpdatePeopleName}>
                    <input
                      id="name"
                      autoComplete="off"
                      defaultValue={person.name}
                      placeholder="이름을 적고 엔터!"
                      type="text"
                      {...register("name")}
                    />
                    <span className="select-container">
                      <select defaultValue={person.sex} {...register("sex")}>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                      </select>
                      <span className="arrow-drop-down">
                        <MdArrowDropDown />
                      </span>
                    </span>
                  </Form>
                  <div className="button-container">
                    <button onClick={onSubmitUpdatePeopleName}>
                      <MdEdit />
                    </button>
                  </div>
                </>
              )}
            </div>
            {!isUpdate && <MdDragHandle />}
          </Container>
        )}
      </Draggable>
    </>
  );
};

export default Human;
