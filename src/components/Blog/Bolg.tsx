import React, { useEffect } from "react";
import styled from "styled-components";
import BlogItems from "./BlogItems";
import { useFetch } from "../../customhooks/useFectch";

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
  const [{ response, isLoading, error }, setOption] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/blog`,
  });

  useEffect(() => {
    setOption({
      method: "GET",
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Wrapper>
          <h1>블로그</h1>
          <ListContainer>
            {response?.map((post: IBlogItems) => (
              <BlogItems key={post._id} post={post} />
            ))}
          </ListContainer>
        </Wrapper>
      )}
      {error?.message && <h1>{error?.message}</h1>}
    </>
  );
}

export default Blog;
