import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import { getRequest } from "../../httpMethod";

const Wrapper = styled.div``;

function NoticeDetail() {
  const { id } = useParams();
  const [{ isLoading, error, response: data }, setOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/api/notice/${id}`,
  });

  useEffect(() => {
    setOptions(getRequest);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Wrapper>
      <h1>{data?.title}</h1>
      <div>
        <span>{data?.views}</span>
        <span>{data?.creator}</span>
        <span>{data?.createdAt}</span>
      </div>
      <p>{data?.paragraph}</p>
    </Wrapper>
  );
}

export default NoticeDetail;
