import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import WorshipItem from "./WorshipDetail/WorshipItem";

const Wrapper = styled.div``;

const Items = styled.ul`
  padding: 0;
`;

export interface IWorshipItems {
  _id: string;
  title: string;
  word: string;
  chapter: number;
  verse: number;
  verse_end: number;
  pastor: string;
  worshipTeam: string;
  prayer: string;
  advertisement: string;
  reader: string;
  offering: string;
  benediction: string;
  creator: string;
  views: number;
  createdAt: string;
}

function Worship() {
  const [{ response, isLoading, error }, setOption] = useFetch({
    URL: "http://localhost:4000/worship",
  });

  useEffect(() => {
    setOption({
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
  }, []);

  return (
    <>
      {error !== null && <p>{error?.message}</p>}
      {isLoading ? (
        <h1>로딩중</h1>
      ) : (
        <Wrapper>
          <h1>예배</h1>
          <Link to="/worship/create">글 작성</Link>
          <Items>
            {response?.map((item: IWorshipItems) => (
              <WorshipItem key={item?._id} worship={item} />
            ))}
          </Items>
        </Wrapper>
      )}
    </>
  );
}

export default Worship;
