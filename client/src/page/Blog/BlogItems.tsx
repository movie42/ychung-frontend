import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IBlogItems } from "./Bolg";

import { HiUser } from "react-icons/hi";
import { calculateDate } from "../../utils/utilities/calculateDate";
import { imageParser } from "../../utils/utilities/imageParser";

const ListItem = styled.li`
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

const PostInfomContainer = styled.div`
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

interface BlogItem {
  post: IBlogItems;
}

function BlogItems({ post }: BlogItem) {
  const {
    _id,
    title,
    paragraph,
    creator: { _id: creatorId, name: creatorName, userName: creatorUserName },
    comments,
    views,
    createdAt,
  } = post;

  return (
    <ListItem>
      <Link to={`/blog/${_id}`}>
        <ItemDetailContainer>
          {imageParser(paragraph) !== null && (
            <div className="thumnail-container">
              <img src={`${imageParser(paragraph)}`} />
            </div>
          )}
          <div className="title-paragraph-container">
            <h3>{title}</h3>
            <p>
              {`${paragraph
                ?.replace(/[#*\\[\]``]|<(.*)>|\((.*)\)/g, " ")
                .replace(/\s+/g, " ")
                .replace(/[\<\>]/g, "")
                .slice(0, 100)}...`}
            </p>
          </div>
        </ItemDetailContainer>
        <PostInfomContainer>
          <UserInfoContainer>
            <ImageContainer>
              <HumanIcon />
            </ImageContainer>
            <InfoContainer>
              <span>{creatorUserName}</span>
              <span>{calculateDate(createdAt)}</span>
            </InfoContainer>
          </UserInfoContainer>
          <ItemDetailInfoContainer>
            <span>조회수 {views}</span>
            <span>댓글 {comments.length}</span>
          </ItemDetailInfoContainer>
        </PostInfomContainer>
      </Link>
    </ListItem>
  );
}

export default BlogItems;
