import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Human from "./Human/Human";
import { Droppable } from "react-beautiful-dnd";

import {
  People,
  Group as GroupProps,
} from "../../../state/educationGroup.atom";
import { useForm } from "react-hook-form";

import usePostOrPatch from "../../../utils/customhooks/usePost";
import { useGet } from "../../../utils/customhooks/useGet";
import { FetchDataProps } from "../../../lib/interface";

import { MdDelete, MdEdit, MdPersonAdd } from "react-icons/md";
import useDelete from "../../../utils/customhooks/useDelete";
import ConfirmDeleteModal from "../../../components/Modals/ConfirmDeleteModal";
import { useQueryClient } from "react-query";

import { translateEducationTypeNameToKR } from "../../../utils/utilities/translateEducationTypeNameToKR";

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
  .group-info {
    display: flex;
    span {
      margin-left: 0.5rem;
    }
  }
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
  position: relative;
  box-sizing: border-box;
  width: 100%;
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    font-size: 1.8rem;
    border: 1px solid ${(props) => props.theme.color.gray300};
  }
`;

const SearchingBox = styled.ul`
  position: absolute;
  top: 4.5rem;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 2;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-top: 0;
  background-color: ${(props) => props.theme.color.background100};
`;
const SearchingItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 1rem 1rem;
  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
  &:hover {
    background-color: ${(props) => props.theme.color.primary700};
    color: ${(props) => props.theme.color.fontColorWhite};
  }
`;

interface IGroupProps {
  item: GroupProps;
}

interface SendPeople {
  _id?: string;
  name?: string;
  type?: "student" | "worker" | "new" | "etc";
}

const Group = ({ item }: IGroupProps) => {
  const searchingListNodes = useRef<HTMLUListElement>(null);
  // const [count, setCount] = useState(0);
  // const [selectedNodeId, setSelectedNodeId] = useState("");

  const queryClient = useQueryClient();
  const [searchPersonName, setSearchPersonName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<{
    name?: string;
    type?: "student" | "worker" | "new" | "etc";
    place?: string;
    groupName?: string;
  }>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);

  const { data: searchPerson, refetch } = useGet<People[] | null>({
    url: `/api/education/search?person=${searchPersonName}`,
    queryKey: "search",
    enabled: false,
  });

  const { data: people } = useGet<People[]>({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
  });

  const { mutate: addNewPeople } = usePostOrPatch<
    FetchDataProps<People[]>,
    Error,
    SendPeople
  >({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
    method: "POST",
  });

  const { mutate: updateGroup } = usePostOrPatch<
    FetchDataProps<GroupProps>,
    Error,
    { _id?: string; name?: string; place?: string }
  >({
    url: `/api/education/group/update`,
    queryKey: "groups",
    method: "PATCH",
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

  const deleteGroup = () => {
    setIsConfirmModal(true);
  };

  const handleSearchBox = () => {};

  const onSubmitNewPeopleName = handleSubmit((data) => {
    addNewPeople(
      {
        name: data.name,
        type: item.type,
      },
      {
        onSuccess: () => {
          setSearchPersonName("");
          reset({ name: "" });
        },
        onError: (err) => {
          setError("name", { message: err.message });
        },
      }
    );
    reset();
  });

  const onSubmitUpdateGroupName = handleSubmit((data) => {
    updateGroup({ _id: item._id, name: data.groupName, place: data.place });
    reset();
    setIsUpdate(false);
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPersonName(e.target.value);
  };

  const selectItem = (person: People) => {
    addNewPeople({ _id: person._id });
    setSearchPersonName("");
    reset({ name: "" });
  };

  // const handleSearchBoxWithKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
  //   const list = searchingListNodes.current?.childNodes;
  //   const select = list ? Array.from(list) : [];

  //   const [id] = select.filter((value, index) => index === count);

  //   if (e.key === "ArrowUp") {
  //     setCount((pre) => {
  //       if (pre <= 0) {
  //         return select.length - 1;
  //       }
  //       return pre - 1;
  //     });
  //   }

  //   if (e.key === "ArrowDown") {
  //     setCount((pre) => {
  //       if (pre >= select.length - 1) {
  //         return 0;
  //       }
  //       return pre + 1;
  //     });
  //   }
  // };

  useEffect(() => {
    if (isDelete) {
      deleteGroupMutate();
      setIsConfirmModal(false);
      setIsDelete(false);
    }
  }, [isDelete]);

  useEffect(() => {
    if (!searchPersonName) {
      return;
    }
    refetch();
  }, [searchPersonName]);

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
          {!isUpdate ? (
            <>
              <div className="group-info">
                <Title>{item.name}</Title>
                <span>{item.place}</span>
              </div>
              <ButtonContainer>
                <button onClick={openAddPeopleInput}>
                  <MdPersonAdd />
                </button>
                <button onClick={() => setIsUpdate(true)}>
                  <MdEdit />
                </button>
                <button onClick={deleteGroup}>
                  <MdDelete />
                </button>
              </ButtonContainer>
            </>
          ) : (
            <>
              <Form onSubmit={onSubmitUpdateGroupName}>
                <input
                  autoComplete="off"
                  id="groupName"
                  defaultValue={item.name}
                  placeholder="이름을 적고 엔터!"
                  type="text"
                  {...register("groupName")}
                />
                <input
                  autoComplete="off"
                  id="place"
                  defaultValue={item.place}
                  placeholder="교환할 장소?"
                  type="text"
                  {...register("place")}
                />
              </Form>
              <ButtonContainer>
                <button onClick={onSubmitUpdateGroupName}>
                  <MdEdit />
                </button>
              </ButtonContainer>
            </>
          )}
        </Header>
        {isOpenPeopleInput && (
          <>
            <Form onSubmit={onSubmitNewPeopleName}>
              <input
                id="name"
                placeholder="이름을 적고 엔터!"
                type="text"
                value={searchPersonName}
                autoComplete="off"
                onClick={handleSearchBox}
                {...register("name", {
                  required: "이름을 꼭 입력해야합니다.",
                  onChange: handleSearch,
                })}
              />

              {!searchPerson ? (
                <SearchingBox>
                  <SearchingItem>
                    <p>검색어 또는 추가할 이름을 입력하세요.</p>
                  </SearchingItem>
                </SearchingBox>
              ) : (
                <SearchingBox ref={searchingListNodes}>
                  {searchPerson?.map((value) => (
                    <SearchingItem
                      key={value._id}
                      data-id={value._id}
                      onClick={() => selectItem(value)}>
                      <p>{value.name}</p>
                      <span>{translateEducationTypeNameToKR(value.type)}</span>
                    </SearchingItem>
                  ))}
                </SearchingBox>
              )}
              <label>{errors.name?.message}</label>
            </Form>
          </>
        )}
        <Droppable droppableId={item._id}>
          {(provided, snapshot) => (
            <PersonList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              {people?.map((person, index) => (
                <Human
                  key={person._id}
                  index={index}
                  person={person}
                  groupId={item._id}
                />
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
