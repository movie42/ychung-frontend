import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import WorshipNotice from "./WorshipNotice";
import WorshipBlog from "./WorshipBlog";

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
  return (
    <Wrapper>
      <h1>정하게 하는 날</h1>
      <UserInfoContainer>
        <ImageContainer>
          <img src="" alt="" />
        </ImageContainer>
        <InforContainer>
          <span>user name</span>
          <span>1시간 전</span>
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
                <span>레위기 14장 10-20절</span>
              </a>
            </WorshipItem>
            <WorshipItem>
              <span>강론</span>
              <span>김상돈 목사</span>
            </WorshipItem>
            <WorshipItem>
              <span>경배와 찬양</span>
              <span>둘로스</span>
            </WorshipItem>
            <WorshipItem>
              <span>대표 기도</span>
              <span>이진영</span>
            </WorshipItem>
            <WorshipItem>
              <span>광고</span>
              <span>박도현</span>
            </WorshipItem>
            <WorshipItem>
              <span>성경 봉독</span>
              <span>다같이</span>
            </WorshipItem>
            <WorshipItem>
              <span>봉헌 기도 및 축도</span>
              <span>김상돈 목사</span>
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
