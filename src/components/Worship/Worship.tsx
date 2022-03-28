import React from "react";
import styled from "styled-components";
import { useFetch, IAipResponse } from "../../customhooks/useFectch";
import WorshipItem from "./WorshipItem";

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
  year: string;
  month: string;
  date: string;
  day: string;
  time: string;
  creator: string;
  views: number;
  createdAt: string;
}

function Worship() {
  const { loading, error, data }: IAipResponse = useFetch(
    "http://localhost:4000/worship"
  );

  return (
    <Wrapper>
      <h1>예배</h1>
      <Items>
        {data?.map((item: IWorshipItems) => (
          <WorshipItem worship={item} />
        ))}
      </Items>
    </Wrapper>
  );
}

export default Worship;
