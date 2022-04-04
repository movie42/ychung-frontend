import React, { useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import NoticeItem from "./NoticeItem";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

export interface INoticeInterface {
  _id?: string;
  title?: string;
  isWeekly?: boolean;
  paragraph?: string;
  creator?: string;
  comments?: [];
  views?: number;
  year?: string;
  month?: string;
  date?: string;
  day?: string;
  time?: string;
  createdAt?: string;
}

function Notice() {
  const [{ isLoading, error, response: notices }, setOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/notice`,
  });

  useEffect(() => {
    setOptions({
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credential: "include",
      mode: "cors",
    });

    return () => {
      setOptions({});
    };
  }, []);

  return (
    <Wrapper>
      <h1>공지사항</h1>
      <Link to={"/notice/create"}>공지 쓰기</Link>
      <ListContainer>
        {error && <h2>error?.message</h2>}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          notices?.map((notice: INoticeInterface) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))
        )}
      </ListContainer>
    </Wrapper>
  );
}

export default Notice;
