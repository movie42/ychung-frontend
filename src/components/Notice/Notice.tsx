import React from "react";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import NoticeItem from "./NoticeItem";

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
  // const {
  //   loading,
  //   error,
  //   data: notices,
  // }: IAipResponse = useFetch("${process.env.REACT_APP_SERVER_URL}/notice");

  return (
    <Wrapper>
      <h1>공지사항</h1>
      <ListContainer>
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : (
          notices?.map((notice: INoticeInterface) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))
        )} */}
      </ListContainer>
    </Wrapper>
  );
}

export default Notice;
