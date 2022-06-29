import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Human from "./Human/Human";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  groupsState,
  groupInfoState,
  People,
  Group as GroupProps,
  groupAndpeopleState,
} from "../../../state/educationGroup.atom";
import { useForm } from "react-hook-form";
import { compare } from "../../../utils/utilities/compare";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { useGet } from "../../../utils/customhooks/useGet";
import { FetchDataProps } from "../../../lib/interface";
import Loading from "../../../components/Loading";
import {
  MdAddCircle,
  MdDelete,
  MdEdit,
  MdPersonAdd,
  MdRemoveCircle,
} from "react-icons/md";
import useDelete from "../../../utils/customhooks/useDelete";
import ConfirmDeleteModal from "../../../components/Modals/ConfirmDeleteModal";
import { useQueryClient } from "react-query";

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    background-color: unset;
    border: 0;
    font-size: 2.5rem;
    color: ${(props) => props.theme.color.gray300};
    &:hover {
      color: ${(props) => props.theme.color.primary300};
    }
  }
`;

const Title = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const PersonList = styled.div<{ isDraggingOver: boolean }>`
  box-sizing: border-box;
  margin: 2rem 0;
  font-size: 1.8rem;
  transition: all 0.2s ease-in-out;
  padding: ${(props) => props.isDraggingOver && "1rem"};
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.color.primary300
      : props.theme.color.background100};
  flex-grow: 1;
  min-height: 100px;
`;

const AddPersonButton = styled.button`
  cursor: pointer;
  border: 0;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 0.5rem;
  background-color: unset;
  font-size: 1.7rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.color.gray500};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.primary300};
    background-color: ${(props) => props.theme.color.primary300};
    color: ${(props) => props.theme.color.fontColorWhite};
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
`;

interface IGroupProps {
  item: GroupProps;
}

interface SendPeople {
  name: string;
  type: "student" | "worker" | "new" | "etc";
}

const Group = ({ item }: IGroupProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<People>();
  const groupAndpeople = useRecoilValue(groupAndpeopleState);
  const [people] = groupAndpeople
    .filter((person) => person._id === item._id)
    .map((value) => value.humanIds);

  const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);

  const { mutate: addNewPeople } = usePostOrPatch<
    FetchDataProps<People[]>,
    Error,
    SendPeople
  >({
    url: `/api/education/group/${item._id}/people`,
    queryKey: "people",
    method: "POST",
  });

  const {
    mutate: deleteGroupMutate,
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
  } = useDelete({
    url: `/api/education/group/${item._id}`,
    queryKey: "groups",
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  const openAddPeopleInput = () => {
    setIsOpenPeopleInput(!isOpenPeopleInput);
  };

  const updateGroup = () => {};

  const deleteGroup = () => {
    setIsConfirmModal(true);
  };

  const onSubmitData = handleSubmit((data) => {
    addNewPeople({
      name: data.name,
      type: item.type,
    });
  });

  useEffect(() => {
    if (isDelete) {
      deleteGroupMutate();
      setIsConfirmModal(false);
      setIsDelete(false);
    }
  }, [isDelete]);

  return (
    <>
      {isConfirmModal && (
        <ConfirmDeleteModal
          setIsDelete={setIsDelete}
          setIsConfirmModal={setIsConfirmModal}
          title="그룹을 삭제하시겠습니까?"
          subtitle="그룹을 삭제하면 복구할 수 없습니다. 참가자는 그대로 남습니다."
        />
      )}
      <Container data-id={item._id}>
        <Header>
          <Title>{item.name}</Title>
          <ButtonContainer>
            <button onClick={openAddPeopleInput}>
              <MdPersonAdd />
            </button>
            <button onClick={updateGroup}>
              <MdEdit />
            </button>
            <button onClick={deleteGroup}>
              <MdDelete />
            </button>
          </ButtonContainer>
        </Header>
        {isOpenPeopleInput && (
          <Form onSubmit={onSubmitData}>
            <input
              id="name"
              placeholder="이름을 적고 엔터!"
              type="text"
              {...register("name")}
            />
          </Form>
        )}
        <Droppable droppableId={item._id}>
          {(provided, snapshot) => (
            <PersonList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              {people.map((person, index) => (
                <Human key={person._id} index={index} person={person} />
              ))}
              {provided.placeholder}
            </PersonList>
          )}
        </Droppable>
      </Container>
    </>
  );
};

export default Group;
