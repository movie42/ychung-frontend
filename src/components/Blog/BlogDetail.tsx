import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../customhooks/useFectch";
import styled from "styled-components";
import { getRequest } from "../../httpMethod";
import { Viewer } from "@toast-ui/react-editor";

const Wrapper = styled.div``;
const BlogInfoContainer = styled.div``;
const ParagraphContainer = styled.div``;
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface BlogDetail {
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

function BlogDetail() {
  const { id } = useParams();

  const [{ isLoading, error, response: post }, setOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`,
  });

  useEffect(() => {
    setOptions(getRequest);
  }, []);

  return (
    <>
      {error && <h1>{error.message}</h1>}
      {isLoading ? (
        <h1>로딩 중...</h1>
      ) : (
        <Wrapper>
          <h1>{post?.title}</h1>
          <UserInfoContainer>
            <ImageContainer>
              <img src="" alt="" />
            </ImageContainer>
            <InforContainer>
              <span>{post?.creator}</span>
              <span>{post?.createdAt}</span>
              <span>{post?.views}</span>
            </InforContainer>
          </UserInfoContainer>
          <ParagraphContainer>
            <Viewer initialValue={post?.paragraph} />
          </ParagraphContainer>
        </Wrapper>
      )}
    </>
  );
}

export default BlogDetail;
