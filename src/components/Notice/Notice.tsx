import React, { useEffect, useState } from "react";
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

function Notice() {
  const notices = useFetch("http://localhost:4000/notice");

  return (
    <Wrapper>
      <h1>공지사항</h1>
      <ListContainer>
        {notices.map((notice) => (
          <NoticeItem notice={notice} />
        ))}
      </ListContainer>
    </Wrapper>
  );
}

export default Notice;
