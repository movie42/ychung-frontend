import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import NoticeItem from "./NoticeItem";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
`;

const ListContainer = styled.ul`
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    grid-auto-rows: minmax(35rem, 42rem);
    gap: 1.5rem;
  }
  padding: 0;
`;

export interface INoticeInterface {
  _id: string;
  title: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
    name: string;
    userName: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

function Notice() {
  const {
    isLoading,
    error,
    data: notices,
  } = useQuery(
    "notice",
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notice`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );

  return (
    <Wrapper>
      <h1>공지사항</h1>
      <Link to={"/notice/create"}>공지 쓰기</Link>
      <ListContainer>
        {error && <h2>error?.message</h2>}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          notices.map((notice: INoticeInterface) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))
        )}
      </ListContainer>
    </Wrapper>
  );
}

export default Notice;
