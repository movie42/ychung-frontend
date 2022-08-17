import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../../state/Authrization";
import { groupInfoState } from "../../../state/educationGroup.atom";
import { useGet } from "@/lib/hooks";
import { calculateDate } from "@/lib/utils";

import GroupItem from "./GroupItem";
import GroupItemContainer from "./GroupItemContainer";

import { IconButton, Loading } from "@/components";

const Wrapper = styled.div`
  margin-top: 8rem;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const GroupSection = styled.section``;

const TextContainer = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5 {
    padding: 1rem 0;
  }
`;

const CreateGroupButton = styled(IconButton)`
  margin-left: 2rem;
`;

interface IEducationFetchData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
  createdAt: Date;
}

const Educations = () => {
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(loginState);

  const queryClient = useQueryClient();
  const { isLoading, data } = useGet<IEducationFetchData[]>({
    url: "/api/education/groups",
    queryKey: "educations",
  });

  const createGroup = () => {
    navigate("/education/groups/create");
  };

  const moveToDetail = (
    e: React.MouseEvent<HTMLLIElement>,
    _id: string,
    isPublic: boolean
  ) => {
    isPublic
      ? navigate(`/education/groups/${_id}`)
      : navigate(`/education/groups/${_id}/update`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header>
        <TextContainer>
          <h1>교육</h1>
        </TextContainer>
      </Header>

      {data && (
        <GroupSection>
          <Header>
            <TextContainer>
              <h2>소그룹</h2>
              {data?.filter((value) => value.isPublic).length !== 0 ? (
                <p>참여하고 있는 소그룹을 선택해주세요.</p>
              ) : (
                <p>공개중인 소그룹이 없습니다.</p>
              )}
            </TextContainer>
            {isLogin && (
              <CreateGroupButton onClick={createGroup} buttonType="block">
                <AiOutlineCloudUpload />
              </CreateGroupButton>
            )}
          </Header>
          <GroupItemContainer
            style={{ border: "1px solid #333333" }}
            data={data.filter((value) => value.isPublic)}
            renderFunc={(item: IEducationFetchData) => (
              <GroupItem
                key={item._id}
                data-id={item._id}
                onClick={(e) => moveToDetail(e, item._id, item.isPublic)}>
                <h3>{item.title}</h3>
                <span>{calculateDate(item.createdAt.toString())}</span>
              </GroupItem>
            )}
          />
        </GroupSection>
      )}

      {data && isLogin && (
        <GroupSection>
          <Header>
            <TextContainer>
              <h2>작성 중인 소그룹</h2>
            </TextContainer>
          </Header>
          {data.length !== 0 ? (
            <GroupItemContainer
              style={{ border: "1px solid #333333" }}
              data={data.filter((value) => !value.isPublic)}
              renderFunc={(item: IEducationFetchData) => (
                <GroupItem
                  key={item._id}
                  data-id={item._id}
                  onClick={(e) => moveToDetail(e, item._id, item.isPublic)}>
                  <h3>{item.title}</h3>
                  <span>{calculateDate(item.createdAt.toString())}</span>
                </GroupItem>
              )}
            />
          ) : (
            <p>작성 중인 소그룹이 없습니다.</p>
          )}
        </GroupSection>
      )}
    </Wrapper>
  );
};

export default Educations;
