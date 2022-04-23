import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { INoticeInterface } from "../../Notice/Notice";
import { BsArrowRight } from "react-icons/bs";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  a {
    font-size: 2.2rem;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    p {
      margin: 0 0 1rem 0;
    }
    div {
      font-size: 1.6rem;
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.color.gray300};
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
  background-color: ${(props) => props.theme.color.gray300};
`;

function WorshipBlog() {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(
    "posts",
    async () => {
      const response = await fetch(`/api/blog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );
  return isLoading ? (
    <p>블로그 불러오는 중...</p>
  ) : (
    <ListContainer>
      {posts.slice(0, 3).map((post: INoticeInterface) => (
        <ListItem key={post._id}>
          <a href={`/notice/${post._id}`}>
            <p>{post.title}</p>
            <div>
              자세히 보기
              <span>
                <BsArrowRight />
              </span>
            </div>
          </a>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default WorshipBlog;
