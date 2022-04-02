import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch, IUseFetchReturnValue } from "../../customhooks/useFectch";
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

  const response = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/api/blog/${id}`,
  });

  console.log(response);

  return null;
  // return state?.loading ? (
  //   <h1>로딩 중...</h1>
  // ) : error?.message ? (
  //   <h1>{error?.message}</h1>
  // ) : (
  //   <Wrapper>
  //     <h1>{state?.title}</h1>
  //     <UserInfoContainer>
  //       <ImageContainer>
  //         <img src="" alt="" />
  //       </ImageContainer>
  //       <InforContainer>
  //         <span>{state?.creator}</span>
  //         <span>{state?.createdAt}</span>
  //         <span>{state?.views}</span>
  //       </InforContainer>
  //     </UserInfoContainer>
  //     <BlogInfoContainer>
  //       <p>{state?.paragraph}</p>
  //     </BlogInfoContainer>
  //   </Wrapper>
  // );
}

export default BlogDetail;
