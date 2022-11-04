import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { calculateDate } from "@/lib/utils";
import { Authorization, IconButton, Loading } from "@/Components";
import GroupItem from "./GroupItem";
import GroupItemContainer from "./GroupItemContainer";
import { useGetEducations } from "../hooks";

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

const Educations = () => {
  const navigate = useNavigate();
  const { isLoading, data: groups } = useGetEducations();

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Header>
        <TextContainer>
          <h1>교육</h1>
        </TextContainer>
      </Header>

      {groups && (
        <GroupSection>
          <Header>
            <TextContainer>
              <h2>소그룹</h2>
              {groups?.filter((value) => value.isPublic).length !== 0 ? (
                <p>참여하고 있는 소그룹을 선택해주세요.</p>
              ) : (
                <p>공개중인 소그룹이 없습니다.</p>
              )}
            </TextContainer>
            <Authorization authority={3}>
              <>
                <CreateGroupButton onClick={createGroup}>
                  <AiOutlineCloudUpload />
                </CreateGroupButton>
              </>
            </Authorization>
          </Header>
          <GroupItemContainer
            style={{ border: "1px solid #333333" }}
            data={groups.filter((group) => group.isPublic)}
            renderFunc={(group) => (
              <GroupItem
                key={group._id}
                data-id={group._id}
                onClick={(e) => moveToDetail(e, group._id, group.isPublic)}
              >
                <h3>{group.title}</h3>
                <span>{calculateDate(group.createdAt.toString())}</span>
              </GroupItem>
            )}
          />
          <Authorization authority={3}>
            <>
              <Header>
                <TextContainer>
                  <h2>작성 중인 소그룹</h2>
                </TextContainer>
              </Header>
              {groups.length !== 0 ? (
                <GroupItemContainer
                  style={{ border: "1px solid #333333" }}
                  data={groups.filter((value) => !value.isPublic)}
                  renderFunc={(group) => (
                    <GroupItem
                      key={group._id}
                      data-id={group._id}
                      onClick={(e) =>
                        moveToDetail(e, group._id, group.isPublic)
                      }
                    >
                      <h3>{group.title}</h3>
                      <span>{calculateDate(group.createdAt.toString())}</span>
                    </GroupItem>
                  )}
                />
              ) : (
                <p>작성 중인 소그룹이 없습니다.</p>
              )}
            </>
          </Authorization>
        </GroupSection>
      )}
    </Wrapper>
  );
};

export default Educations;
