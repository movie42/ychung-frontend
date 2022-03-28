import React from "react";
import { useParams } from "react-router";
import { useFetch, IAipResponse } from "../../customhooks/useFectch";
import styled from "styled-components";

const Wrapper = styled.div``;
const BlogInfoContainer = styled.div``;

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

function BlogDetail() {
  const { id } = useParams();
  const { loading, error, data }: IAipResponse = useFetch(
    `http://localhost:4000/api/blog/${id}`
  );

  return loading ? (
    <h1>로딩 중...</h1>
  ) : (
    <Wrapper>
      <h1>{data?.title}</h1>
      <UserInfoContainer>
        <ImageContainer>
          <img src="" alt="" />
        </ImageContainer>
        <InforContainer>
          <span>{data?.creator}</span>
          <span>{data?.createdAt}</span>
          <span>{data?.views}</span>
        </InforContainer>
      </UserInfoContainer>
      <BlogInfoContainer>
        <p>{data?.paragraph}</p>
      </BlogInfoContainer>
    </Wrapper>
  );
}

export default BlogDetail;
