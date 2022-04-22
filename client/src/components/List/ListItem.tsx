import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { calculateDate } from "../../utils/utilities/calculateDate";

import { HiUser } from "react-icons/hi";
import { previewParagraph } from "../../utils/utilities/previewParagraph";
import { imageParser } from "../../utils/utilities/imageParser";

const Item: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = styled.li<
  React.LiHTMLAttributes<HTMLLIElement>
>`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 1.2rem 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.05);
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
    grid-template-rows: 6fr 1fr;
  }
`;

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 2rem;
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
  color: ${(props) => props.theme["grayBackgroundColor-light"]};
`;

const ItemDetailContainer = styled.div`
  .thumnail-container {
    box-sizing: border-box;
    width: 100%;
    height: 25rem;
    overflow: hidden;
    border-radius: 0.5rem 0.5rem 0 0;
    img {
      width: 100%;
    }
  }
  .title-paragraph-container {
    padding: 1rem 2rem;
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
  }
`;

const ItemDetailInfoContainer = styled.div`
  span {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

interface UnkownType {
  _id: string;
  title: string;
  paragraph: string;
  creator: { userName: string };
  comments: [];
  views: number;
  createdAt: string;
}

interface IItemProps<T>
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  data: T;
}

const ListItem = <T extends UnkownType>({
  data,
  ...rest
}: React.PropsWithChildren<IItemProps<T>>) => {
  const { _id, title, paragraph, creator, comments, views, createdAt } = data;

  return (
    <Item {...rest}>
      <Link to={`${_id}`}>
        <ItemDetailContainer>
          {imageParser(paragraph) !== null && (
            <div className="thumnail-container">
              <img src={`${imageParser(paragraph)}`} />
            </div>
          )}
          <div className="title-paragraph-container">
            <h3>{title}</h3>
            <p>{previewParagraph(paragraph)}</p>
          </div>
        </ItemDetailContainer>

        <PostInfoContainer>
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
            <span>댓글 {comments?.length}</span>
          </ItemDetailInfoContainer>
        </PostInfoContainer>
      </Link>
    </Item>
  );
};

export default ListItem;