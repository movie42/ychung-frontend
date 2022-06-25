import React, { useEffect } from "react";
import styled from "styled-components";

import Input from "../../../components/Form/Input";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import {
  groupInfoState,
  Group,
  GroupInfo,
} from "../../../state/educationGroup.atom";
import GroupContainer from "./GroupContainer";
import usePostOrPatch from "../../../utils/customhooks/usePost";
import { useGet } from "../../../utils/customhooks/useGet";
import ToggleButton from "../../../components/Buttons/Toggle";
import { FetchDataProps } from "../../../lib/interface";
import Label from "../../../components/Form/Label";
import { group } from "console";

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
  justify-content: flex-end;
  display: flex;
  align-items: center;
  p {
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
  const [groupInfo, setGroupInfo] = useRecoilState(groupInfoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GroupInfo>();

  const { data: response, isSuccess } = useGet<GroupInfo>({
    url: `/api/education/groups/${id}`,
    queryKey: "group",
    onSuccess: (response) => {
      if (response) {
        setGroupInfo(response);
      }
    },
  });

  const { mutate: groupInfoMutation } = usePostOrPatch<
    FetchDataProps<GroupInfoSend>,
    Error,
    GroupInfoSend
  >({
    url: `/api/education/groups/${id}`,
    queryKey: "group",
    method: "PATCH",
  });

  const toggleButton = () => {
    groupInfoMutation({ isPublic: !groupInfo.isPublic });
  };

  const changeTitle = handleSubmit((data) => {
    const { title } = data;
    setGroupInfo((pre) => ({ ...pre, title }));
    groupInfoMutation({ title });
  });

  return (
    <Wrapper>
      <Header>
        <div>
          <form onSubmit={changeTitle}>
            <TitleInput
              type="text"
              defaultValue={groupInfo?.title}
              placeholder="소그룹 이름을 입력하세요."
              {...register("title", {
                required: "제목은 반드시 입력해야합니다.",
              })}
            />
            <button style={{ visibility: "hidden" }}>제출</button>
          </form>
        </div>
        <ButtonContainer>
          <p>
            {groupInfo.isPublic
              ? "소그룹을 공개하고 있습니다."
              : "아직 작성 중인 소그룹입니다."}
          </p>
          <ToggleButton
            isActive={groupInfo?.isPublic}
            size={4}
            onClick={toggleButton}
          />
        </ButtonContainer>
      </Header>
      <GroupContainer />
    </Wrapper>
  );
}

export default EducationUpdate;
