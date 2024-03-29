import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Human from "./Human/Human";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { MdArrowDropDown, MdDelete, MdEdit, MdPersonAdd } from "react-icons/md";
import { ConfirmDeleteModal } from "@/Components";
import { People, Group as GroupProps } from "@/lib/state";

import { translateEducationTypeNameToKR } from "@/lib/utils";
import { useDebouncedEffect, useModalContorl } from "@/lib/hooks";
import {
  useAddNewPerson,
  useGetPeople,
  useDeleteGroup,
  useEducaionSearchPerson,
  useUpdateGroup
} from "../hooks";

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

// const AddPersonButton = styled.button`
//   cursor: pointer;
//   border: 0;
//   padding: 1rem;
//   border: 1px solid ${(props) => props.theme.color.gray300};
//   border-radius: 0.5rem;
//   background-color: unset;
//   font-size: 1.7rem;
//   text-align: left;
//   display: flex;
//   justify-content: space-between;
//   color: ${(props) => props.theme.color.gray500};
//   &:hover {
//     border: 1px solid ${(props) => props.theme.color.primary300};
//     background-color: ${(props) => props.theme.color.primary300};
//     color: ${(props) => props.theme.color.fontColorWhite};
//   }
// `;

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
    margin: 0;
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
const SearchingItem = styled.li<{ isSelect?: boolean }>`
  display: grid;
  grid-template-columns: 3fr 0.5fr 0.5fr;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 1rem 1rem;
  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
  background-color: ${(props) =>
    props.isSelect && props.theme.color.primary300};
  &:hover {
    background-color: ${(props) => props.theme.color.primary700};
    color: ${(props) => props.theme.color.fontColorWhite};
  }
`;

interface IGroupProps {
  item: GroupProps;
}

interface Form {
  name?: string;
  type?: "student" | "worker" | "new" | "etc";
  place?: string;
  groupName?: string;
}

const Group = ({ item }: IGroupProps) => {
  const searchingListNodes = useRef<HTMLUListElement>(null);
  const [isSearchingBoxError, setSearchingBoxError] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [searchPersonName, setSearchPersonName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm<Form>();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);
  const [searchPerson, setSearchPerson] = useState<People[] | null>();

  const { isModal, isConfirm, setIsConfirm, setIsModal } = useModalContorl();

  const { mutate: addNewPeople } = useAddNewPerson();
  const { mutate: deleteGroupMutate } = useDeleteGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { data: people } = useGetPeople(item._id);
  const { refetch } = useEducaionSearchPerson(
    searchPersonName,
    setSearchPerson
  );

  useDebouncedEffect(() => refetch(), 300, [searchPersonName]);

  const openAddPeopleInput = () => {
    setIsOpenPeopleInput(!isOpenPeopleInput);
    reset({ name: "" });
    setSearchPersonName("");
    setSearchPerson([]);
  };

  const deleteGroup = () => {
    setIsModal(true);
  };

  const onSubmitNewPeopleName = handleSubmit((data) => {
    if (selectedNodeId && searchPerson && searchPerson.length !== 0) {
      const [selectedItem] = searchPerson.filter(
        (person) => person._id === selectedNodeId
      );
      selectItem(selectedItem);
    } else if (data.name) {
      addNewPeople(
        {
          id: item._id,
          body: {
            name: data.name,
            type: item.type
          }
        },
        {
          onSuccess: () => {
            setSearchPerson([]);
            reset({ name: "" });
          },
          onError: (err) => {
            setSearchPerson([]);
            reset({ name: "" });
            setError("name", { message: err.message });
          }
        }
      );
    }

    setIsOpenPeopleInput(!isOpenPeopleInput);
    reset({ name: "" });
    setSearchPersonName("");
    setSearchPerson([]);
  });

  const onSubmitUpdateGroupName = handleSubmit((data) => {
    const id = item._id;
    const body = {
      _id: id,
      name: data.groupName,
      type: data.type,
      place: data.place
    };
    if (id) {
      updateGroup({ body });
      reset();
      setIsUpdate(false);
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPersonName(() => e.target.value);
  };

  const selectItem = (person: People) => {
    const hasHuman = item.humanIds.some((value) => value === person._id);
    if (hasHuman) {
      setSearchingBoxError(true);
      return;
    }
    addNewPeople({ id: item._id, body: { _id: person._id } });
    reset({ name: "" });
  };

  const handleSearchBoxWithKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setCount(count - 1);
    }

    if (e.key === "ArrowDown") {
      setCount(count + 1);
    }

    if (e.key === "Escape") {
      setSearchPerson([]);
      setIsOpenPeopleInput(false);
    }
  };

  const findNodes = (count: number) => {
    const list = searchingListNodes.current?.childNodes;
    const select = list ? Array.from(list) : [];
    const [li] = select.filter(
      (value, index) => index === count
    ) as HTMLLIElement[];
    const selectId = li && li.dataset.id;
    setSelectedNodeId(() => String(selectId));
    return li;
  };

  const selectNode = (count: number) => {
    const li = findNodes(count);
    const num = 0 - count;
    if (searchingListNodes && li && num <= 0) {
      searchingListNodes.current?.scrollTo(0, li.offsetTop);
    }

    if (searchingListNodes && li && num >= 0) {
      searchingListNodes.current?.scrollTo(li.offsetTop, 0);
    }
  };

  useEffect(() => {
    const length = searchPerson?.length as number;

    if (count < 0) {
      setCount(length - 1);
      return;
    }

    if (count >= length) {
      setCount(0);
      return;
    }

    selectNode(count);
  }, [searchPerson, count, setCount]);

  useEffect(() => {
    const id = item._id;
    if (isConfirm && id) {
      deleteGroupMutate({ id });
      setIsConfirm(false);
      setIsModal(false);
    }
  }, [isConfirm]);

  useEffect(() => {
    const timeout = setTimeout(() => setSearchingBoxError(false), 3000);
    return () => clearTimeout(timeout);
  }, [isSearchingBoxError, setSearchingBoxError]);

  return (
    <>
      {isModal && (
        <ConfirmDeleteModal
          setIsModal={setIsModal}
          setIsConfirm={setIsConfirm}
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
                <span className="select-container">
                  <select
                    defaultValue={item.type}
                    {...register("type")}
                  >
                    <option value="student">학생</option>
                    <option value="worker">직장</option>
                    <option value="new">새신자</option>
                    <option value="etc">기타</option>
                  </select>
                  <span className="arrow-drop-down">
                    <MdArrowDropDown />
                  </span>
                </span>
                <input
                  type="submit"
                  hidden={true}
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
                {...register("name", {
                  required: "이름을 꼭 입력해야합니다.",
                  onChange: handleSearch
                })}
                onKeyDown={(e) => handleSearchBoxWithKey(e)}
              />

              {searchPerson?.length === 0 ? (
                <SearchingBox>
                  <SearchingItem>
                    <p>검색어 또는 추가할 이름을 입력하세요.</p>
                  </SearchingItem>
                </SearchingBox>
              ) : (
                <SearchingBox ref={searchingListNodes}>
                  {isSearchingBoxError && <span>이미 참가하고 있습니다.</span>}
                  {searchPerson?.map((value) => (
                    <SearchingItem
                      key={value._id}
                      data-id={value._id}
                      isSelect={
                        selectedNodeId ? value._id === selectedNodeId : false
                      }
                      onClick={() => selectItem(value)}
                    >
                      <p>{value.name}</p>
                      <span>{value.sex === "male" ? "남자" : "여자"}</span>
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
              isDraggingOver={snapshot.isDraggingOver}
            >
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
