import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getRequest } from "@/lib/utils";

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
  background-color: ${(props) => props.theme.color.gray300};
`;

const Utility = styled.div``;

interface UserProps {
  user: {
    _id: string;
    email: string;
    userName: string;
    name: string;
    authority: string | null;
    worship: [];
    blog: [];
    notice: [];
    documents: [];
    comments: [];
  };
}

function User() {
  const { isLoading, data } = useQuery<UserProps>("userInfo", async () => {
    const response = await fetch(`/api/user`, getRequest);
    return await response.json();
  });

  return isLoading ? (
    <h1>정보를 불러오는 중입니다.</h1>
  ) : (
    <Wrapper>
      <UserInfoContainer>
        <ImageContainer>
          <img src="" />
        </ImageContainer>
        <InfoContainer>
          <span>{data?.user.name}</span>
          <span>{data?.user.email}</span>
        </InfoContainer>
      </UserInfoContainer>
      <Utility>
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
      </Utility>
    </Wrapper>
  );
}

export default User;
