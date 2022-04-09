import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import WorshipNotice from "./WorshipNotice";
import WorshipBlog from "./WorshipBlog";
import { useFetch } from "../../../customhooks/useFectch";
import { getRequest } from "../../../httpMethod";

const Wrapper = styled.div``;

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

const WorshipInfoContainer = styled.div``;

const WorshipItems = styled.ul`
  padding: 0;
`;

const WorshipItem = styled.li``;

const NoticeContainer = styled.div``;

const BlogContainer = styled.div``;

function WorshipDetail() {
  const { id } = useParams();

  const [{ isLoading, error, response: data }, setOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/api/worship/${id}`,
  });

  useEffect(() => {
    setOptions(getRequest);
  }, []);

  return isLoading ? (
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
        </InforContainer>
      </UserInfoContainer>
      <WorshipInfoContainer>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <WorshipItems>
            <WorshipItem>
              <span>본문</span>
              <a href="#">
                <span>
                  {data?.word} {data?.chapter}장 {data?.verse}
                  {data?.verse_end && `~ ${data?.verse_end}`}절
                </span>
              </a>
            </WorshipItem>
            <WorshipItem>
              <span>강론</span>
              <span>{data?.pastor} 목사</span>
            </WorshipItem>
            <WorshipItem>
              <span>경배와 찬양</span>
              <span>{data?.worshipTeam}</span>
            </WorshipItem>
            <WorshipItem>
              <span>대표 기도</span>
              <span>{data?.prayer}</span>
            </WorshipItem>
            <WorshipItem>
              <span>광고</span>
              <span>{data?.adverisement}</span>
            </WorshipItem>
            <WorshipItem>
              <span>성경 봉독</span>
              <span>{data?.reader}</span>
            </WorshipItem>
            <WorshipItem>
              <span>봉헌 기도 및 축도</span>
              <span>{data?.benediction} 목사</span>
            </WorshipItem>
          </WorshipItems>
        </div>
      </WorshipInfoContainer>
      <NoticeContainer>
        <WorshipNotice />
      </NoticeContainer>
      <BlogContainer>
        <WorshipBlog />
      </BlogContainer>
    </Wrapper>
  );
}

export default WorshipDetail;