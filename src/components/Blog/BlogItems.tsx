import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IBlogItems } from "./Bolg";

const ListItem = styled.li`
  width: 100%;
  padding: 0 0 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
  a {
    color: ${(props) => props.theme.fontColor};
    text-decoration: none;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

interface BlogItem {
  post: {
    _id: string;
    title: string;
    paragraph: string;
    year: string;
    month: string;
    date: string;
    day: string;
    time: string;
    creator: string;
    comments: [];
    views: number;
    createdAt: string;
  };
}

function BlogItems({ post }: BlogItem) {
  const { _id, title, paragraph, creator, comments, views, createdAt } = post;
  return (
    <ListItem>
      <Link to={`/blog/${_id}`}>
        <UserInfoContainer>
          <ImageContainer>
            <img src="" />
          </ImageContainer>
          <InfoContainer>
            <span>{creator}</span>
            <span>{createdAt}</span>
          </InfoContainer>
        </UserInfoContainer>
        <div>
          <h3>{title}</h3>
          <p>
            {`${paragraph
              ?.replace(/[#*\\[\]``]|<(.*)>|\((.*)\)/g, " ")
              .replace(/\s+/g, " ")
              .replace(/[\<\>]/g, "")
              .slice(0, 150)}...`}
          </p>
        </div>
        <div>
          <span>공감 0</span>
          <span>댓글 {comments.length}</span>
        </div>
      </Link>
    </ListItem>
  );
}

export default BlogItems;