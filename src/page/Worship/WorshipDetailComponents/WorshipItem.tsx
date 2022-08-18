import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { calculateDate } from "@/lib/utils";
import { IWorshipItems } from "@/lib/state";
import { HiUser } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const ListItem = styled.li`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    box-shadow: 0rem 0 1rem rgba(0, 0, 0, 0.2);
  }
  a {
    display: grid;
    height: 100%;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    grid-template-rows: 3fr 1fr;
  }
  &:hover {
    background-color: ${(props) => props.theme.color.primary900};
    a {
      color: ${(props) => props.theme.color.fontColorWhite};
    }
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  span {
    &:not(:first-child) {
      margin-top: 0.4rem;
    }
    color: ${(props) => props.theme.color.gray300};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  z-index: -1;
  background-color: ${(props) => props.theme.color.gray100};
`;

const HumanIcon = styled(HiUser)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.6rem;
  width: 4.5rem;
  height: 4.5rem;
  color: ${(props) => props.theme.color.gray300};
`;

const ItemDetailContainer = styled.div`
  margin-top: 1rem;
  h3 {
    margin: 0;
    font-size: 6rem;
    line-height: 1.3;
    word-break: keep-all;
    font-weight: 900;
  }
  div {
    display: flex;
    flex-direction: row-reverse;
    font-size: 3rem;
    margin-bottom: 2rem;
    margin-right: 1rem;
    svg {
      display: flex;
      justify-items: end;
    }
  }
  &:hover {
    color: ${(props) => props.theme.color.fontColorWhite};
  }
`;

const ItemDetailInfoContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.gray300};
  span {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

const WeeklyInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface WorshipItems {
  worship: IWorshipItems;
  onClick: (id: string) => any;
}

function WorshipItem({ worship, onClick }: WorshipItems) {
  const { _id, title, creator, views, createdAt } = worship;

  return (
    <ListItem onClick={() => onClick(_id)}>
      <Link to={`/worship/${_id}`}>
        <ItemDetailContainer>
          <h3>{title}</h3>
          <div>
            <BsArrowRight />
          </div>
        </ItemDetailContainer>
        <WeeklyInfoContainer>
          <UserInfoContainer>
            <ImageContainer>
              <HumanIcon />
            </ImageContainer>
            <InfoContainer>
              <span>{creator.userName}</span>
              <span>{calculateDate(createdAt)}</span>
            </InfoContainer>
          </UserInfoContainer>
          <ItemDetailInfoContainer>
            <span>조회수 {views}</span>
          </ItemDetailInfoContainer>
        </WeeklyInfoContainer>
      </Link>
    </ListItem>
  );
}

export default WorshipItem;
