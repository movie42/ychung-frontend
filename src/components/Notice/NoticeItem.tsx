import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { calculateDate } from "../../customhooks/utiles";
import { INoticeInterface } from "./Notice";
import { HiUser } from "react-icons/hi";

const ListItem = styled.li`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 1.2rem 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
  margin-top: 3rem;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    box-shadow: 0rem 0 1rem rgba(0, 0, 0, 0.2);
  }
  &:hover {
    z-index: 10;
    background-color: ${(props) => props.theme["grayBackgroundColor-light"]};
  }
  a {
    display: grid;
    height: 100%;
    color: ${(props) => props.theme.fontColor};
    text-decoration: none;
    grid-template-rows: 1fr 5fr 1fr;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  span {
    &:not(:first-child) {
      margin-top: 0.4rem;
    }
    color: ${(props) => props.theme["fontColor-light"]};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

const HumanIcon = styled(HiUser)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.6rem;
  width: 4.5rem;
  height: 4.5rem;
  color: ${(props) => props.theme["fontColor-light"]};
`;

const ItemDetailContainer = styled.div`
  h3 {
    margin: 0;
    font-size: 2.4rem;
    line-height: 1.8;
  }
  p {
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.6;
  }
`;

const ItemDetailInfoContainer = styled.div`
  display: flex;
  align-self: end;
  span {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

interface NoticeProps {
  notice: INoticeInterface;
  onClick: (e: any) => any;
}

function NoticeItem({ notice, onClick }: NoticeProps): React.ReactElement {
  const { _id, title, paragraph, creator, comments, views, createdAt } = notice;

  const previewParagraph = (item: string) => {
    const newPreview = item
      .replace(/[#*\\[\]``]|<(.*)>|\((.*)\)/g, " ")
      .replace(/\s+/g, " ");
    return newPreview.length < 100
      ? newPreview
      : `${newPreview.slice(0, 100)}...`;
  };

  return (
    <ListItem
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        onClick(_id);
      }}>
      <Link to={`${_id}`}>
        <UserInfoContainer>
          <ImageContainer>
            <HumanIcon />
          </ImageContainer>
          <InfoContainer>
            <span>{creator.userName}</span>
            <span>{calculateDate(createdAt)}</span>
          </InfoContainer>
        </UserInfoContainer>
        <ItemDetailContainer>
          <h3>{title}</h3>
          <p>{previewParagraph(paragraph)}</p>
        </ItemDetailContainer>
        <ItemDetailInfoContainer>
          <span>조회수 {views}</span>
          <span>댓글 {comments?.length}</span>
        </ItemDetailInfoContainer>
      </Link>
    </ListItem>
  );
}

export default NoticeItem;
