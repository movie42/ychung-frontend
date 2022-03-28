import React from "react";
import styled from "styled-components";
import BlogItems from "./BlogItems";
import { IAipResponse, useFetch } from "../../customhooks/useFectch";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

export interface IBlogItems {
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
}

function Blog() {
  const {
    loading,
    error,
    data: posts,
  }: IAipResponse = useFetch("http://localhost:4000/blog");

  return (
    <Wrapper>
      <h1>블로그</h1>
      <ListContainer>
        {posts?.map((post: IBlogItems) => (
          <BlogItems key={post._id} post={post} />
        ))}
      </ListContainer>
    </Wrapper>
  );
}

export default Blog;
