import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import ListContainer from "../../components/List/ListContainer";
import Loading from "../../components/Loading";
import { groupInfoState } from "../../state/educationGroup.atom";
import { useGet } from "../../utils/customhooks/useGet";
import GroupItem from "./GroupItem";

const Wrapper = styled.div`
  margin-top: 8rem;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.div``;

const CreateGroupButton = styled(Button)`
  background-color: unset;
  border: 0.25rem solid ${(props) => props.theme.color.primary300};
  color: ${(props) => props.theme.color.primary300};
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.color.primary300};
    color: ${(props) => props.theme.color.fontColorWhite};
  }
`;

interface IEducationFetchData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
}

const Educations = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useGet<IEducationFetchData[]>({
    url: "/api/education/groups",
    queryKey: "educations",
  });

  const createGroup = () => {
    navigate("/education/groups/create");
  };

  const moveToDetail = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.dataset.id;
    if (data) {
      const [{ isPublic }] = data.filter((value) => value._id === id);
      isPublic
        ? navigate(`/education/groups/${id}`)
        : navigate(`/education/groups/${id}/update`);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header>
        <TextContainer>
          <h2>양청 소그룹</h2>
        </TextContainer>
        <CreateGroupButton onClick={createGroup} buttonType="block">
          추가하기
        </CreateGroupButton>
      </Header>
      {data && (
        <ListContainer
          style={{ border: "1px solid #333333" }}
          data={data}
          renderFunc={(item: IEducationFetchData) => (
            <GroupItem key={item._id} data-id={item._id} onClick={moveToDetail}>
              <h3>{item.title}</h3>
            </GroupItem>
          )}
        />
      )}
    </Wrapper>
  );
};

export default Educations;
