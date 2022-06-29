import React, { useState } from "react";
import styled from "styled-components";
import { Group, People } from "../../../state/educationGroup.atom";
import { useGet } from "../../../utils/customhooks/useGet";
import GroupPerson from "./GroupPerson";

const ItemContainer = styled.li`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.2rem 0.8rem
    ${(props) => props.theme.color.backgroundBlack20};
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  margin-top: 2rem;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    box-shadow: 0rem 0 1.2rem ${(props) => props.theme.color.backgroundBlack20};
  }

  /* &:hover {
    background-color: ${(props) => props.theme.color.primary900};
    color: ${(props) => props.theme.color.fontColorWhite};
  } */
`;

const Item = styled.div`
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 2rem;
  }
  ul {
    padding: 0;
  }
`;

const InfoContainer = styled.div`
  margin-bottom: 1.3rem;
`;

interface IDetailGroupProps {
  group?: Group;
}

interface FetchGroup {
  _id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: People;
}

const DetailGroup = ({ group }: IDetailGroupProps) => {
  const { data: humans } = useGet<People[]>({
    url: `/api/education/group/${group?._id}/people`,
    queryKey: ["people", group?._id ? group._id : ""],
  });

  return (
    <ItemContainer>
      <Item>
        <InfoContainer>
          <h3>조장</h3>
          <h4>{group?.name}</h4>
        </InfoContainer>
        <InfoContainer>
          <h3>참가자</h3>
          {humans && humans.length !== 0 ? (
            <ul>
              {humans?.map((value) => (
                <GroupPerson key={value._id} person={value} />
              ))}
            </ul>
          ) : (
            <p>참가자가 없습니다.</p>
          )}
        </InfoContainer>
      </Item>
    </ItemContainer>
  );
};

export default DetailGroup;
