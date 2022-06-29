import React, { useEffect } from "react";
import styled from "styled-components";

import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { GroupInfo } from "../../../state/educationGroup.atom";
import GroupContainer from "./GroupContainer";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { useGet } from "../../../utils/customhooks/useGet";
import ToggleButton from "../../../components/Buttons/Toggle";
import { FetchDataProps } from "../../../lib/interface";
import Loading from "../../../components/Loading";

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
  } = useGet<GroupInfo>({
    url: `/api/education/groups/${id}`,
    queryKey: "groupInfo",
  });

  const { mutate: groupInfoMutation } = usePostOrPatch<
    FetchDataProps<GroupInfoSend>,
    Error,
    GroupInfoSend
  >({
    url: `/api/education/groups/${id}`,
    queryKey: "groupInfo",
    method: "PATCH",
  });

  const toggleButton = () => {
    groupInfoMutation({ isPublic: !groupInfo?.isPublic });
  };

  const changeTitle = handleSubmit((data) => {
    const { title } = data;
    groupInfoMutation({ title });
  });

  return isRefetching && !isSuccess ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header>
        {/* TODO: 
        1. 이벤트 쓰로틀 걸고 사용자 
        2.쓰기가 끝나면 자동으로 저장되기 
        3. 저장되는 동안 상태 메시지 보여주기  
        4. 저장이 끝난 후에 상태 메시지 보여주기 */}
        <div>
          <form onSubmit={changeTitle}>
            <TitleInput
              type="text"
              defaultValue={groupInfo?.title}
              placeholder="소그룹 제목을 입력하세요."
              {...register("title", {
                required: "제목은 반드시 입력해야합니다.",
              })}
            />
            <button style={{ visibility: "hidden" }}>제출</button>
          </form>
        </div>
        <ButtonContainer>
          <span>
            {groupInfo?.isPublic
              ? "소그룹이 공개 중 입니다."
              : "아직 작성 중인 소그룹입니다."}
          </span>

          <ToggleButton
            isActive={groupInfo?.isPublic ? groupInfo?.isPublic : false}
            size={4}
            onClick={toggleButton}
          />
        </ButtonContainer>
      </Header>
      <GroupContainer groupInfo={groupInfo} />
    </Wrapper>
  );
}

export default EducationUpdate;
