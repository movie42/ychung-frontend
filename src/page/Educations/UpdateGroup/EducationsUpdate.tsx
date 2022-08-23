import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ConfirmDeleteModal, Input, Loading, Toggle } from "@/components";
import { GroupInfo } from "@/lib/state";
import GroupContainer from "./GroupContainer";
import { useModalContorl } from "@/lib/hooks";
import { MdDelete } from "react-icons/md";
import {
  useGetGroupInfo,
  usePatchGroupInfo,
  useDeleteGroupInfo,
} from "../hooks";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const TitleInput = styled(Input)`
  font-size: 4rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.gray700};
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  width: 100%;
  outline: none;
  padding-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    margin-right: 1rem;
  }
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

interface GroupInfoSend {
  _id?: string;
  title?: string;
  isPublic?: boolean;
  groups?: string[];
}

function EducationUpdate() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupInfo>();

  const {
    data: groupInfo,
    isRefetching,
    isSuccess,
  } = useGetGroupInfo(id ? id : "");
  const { mutate: groupInfoMutation } = usePatchGroupInfo();
  const { isConfirm, isModal, setIsConfirm, setIsModal } = useModalContorl();
  const { mutate: deleteGroupInfoMutation } = useDeleteGroupInfo();

  const deleteGroupInfo = () => {
    setIsModal(true);
  };

  const toggleButton = () => {
    if (id) {
      groupInfoMutation({ id, body: { isPublic: !groupInfo?.isPublic } });
    }
  };

  const changeTitle = handleSubmit((data) => {
    const { title } = data;
    if (id) {
      groupInfoMutation({ id, body: { title } });
    }
  });

  useEffect(() => {
    if (isConfirm && id) {
      deleteGroupInfoMutation({ id });
    }
  }, [isConfirm]);

  return isRefetching && !isSuccess ? (
    <Loading />
  ) : (
    <>
      {isModal && (
        <ConfirmDeleteModal
          setIsModal={setIsModal}
          setIsConfirm={setIsConfirm}
          title="교육 정보를 삭제하시겠습니까?"
          subtitle="교육 정보를 삭제하면 복구할 수 없습니다."
        />
      )}
      <Wrapper>
        <Header>
          <div>
            <form onSubmit={changeTitle}>
              <TitleInput
                type="text"
                defaultValue={groupInfo?.title}
                placeholder="교육의 이름을 입력하세요."
                {...register("title", {
                  required: "제목은 반드시 입력해야합니다.",
                })}
              />
              <button style={{ visibility: "hidden" }}>제출</button>
            </form>
          </div>
          <ButtonContainer>
            <button onClick={deleteGroupInfo}>
              <MdDelete />
            </button>
            <span>{groupInfo?.isPublic ? "공개" : "비공개"}</span>
            <Toggle
              isActive={groupInfo?.isPublic ? groupInfo?.isPublic : false}
              size={4}
              onClick={toggleButton}
            />
          </ButtonContainer>
        </Header>
        <GroupContainer groupInfo={groupInfo} />
      </Wrapper>
    </>
  );
}

export default EducationUpdate;
