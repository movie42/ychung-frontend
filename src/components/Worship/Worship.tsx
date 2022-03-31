import React from "react";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
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
  creator: string;
  views: number;
  createdAt: string;
}

function Worship() {
  // const { loading, error, data }: IAipResponse = useFetch(
  //   "http://localhost:4000/worship"
  // );

  return null;
  // return loading ? (
  //   <h1>로딩중</h1>
  // ) : (
  //   <Wrapper>
  //     <h1>예배</h1>
  //     <Items>
  //       {data?.map((item: IWorshipItems) => (
  //         <WorshipItem key={item?._id} worship={item} />
  //       ))}
  //     </Items>
  //   </Wrapper>
  // );
}

export default Worship;
