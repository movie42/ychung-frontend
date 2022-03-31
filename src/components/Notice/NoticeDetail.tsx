import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
const Wrapper = styled.div``;

function NoticeDetail() {
  const { id } = useParams();
  // const { loading, error, data }: IAipResponse = useFetch(
  //   `http://localhost:4000/api/notice/${id}`
  // );

  return (
    <Wrapper>
      {/* <h1>{data?.title}</h1>
      <div>
        <span>{data?.views}</span>
        <span>{data?.creator}</span>
        <span>{data?.createdAt}</span>
      </div>
      <p>{data?.paragraph}</p> */}
    </Wrapper>
  );
}

export default NoticeDetail;
