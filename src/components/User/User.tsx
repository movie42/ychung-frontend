import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;

const UserInfoContainer = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

function User() {
  return (
    <Wrapper>
      <UserInfoContainer>
        <ImageContainer>
          <img src="" />
        </ImageContainer>
        <InfoContainer>
          <span>관리자</span>
          <span>letterteam@gmail.com</span>
          <span>010-0000-0000</span>
        </InfoContainer>
      </UserInfoContainer>
      <div>
        <h3>교육</h3>
        <ul>
          <li>
            <span>소그룹</span>
            <span>직장인 조</span>
            <span>조장</span>
            <span>장수아</span>
            <span>출석</span>
            <span>32회</span>
          </li>
          <li>
            <span>일대일 양육</span>
            <span>수료</span>
          </li>
          <li>
            <span>세례</span>
            <span>O</span>
          </li>
          <li>
            <span>출석</span>
            <span>32회</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>활동 사항</h3>
        <ul>
          <li>
            <Link to="#">
              <h4>내가 쓴 글</h4>
              <span>바로가기 →</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <h4>나의 지원서</h4>
              <span>바로가기 →</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <h4>내가 쓴 댓글</h4>
              <span>바로가기 →</span>
            </Link>
            <Link to="#">
              <h4>좋아요</h4>
              <span>바로가기 →</span>
            </Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}

export default User;
