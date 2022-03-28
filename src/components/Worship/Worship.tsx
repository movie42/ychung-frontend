import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Items = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  padding: 0 0 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
`;

function Worship() {
  return (
    <Wrapper>
      <h1>예배</h1>
      <Items>
        <Item>
          <Link to="/worship/1">
            <UserInfoContainer>
              <ImageContainer>
                <img src="" alt="" />
              </ImageContainer>
              <InforContainer>
                <span>user name</span>
                <span>1시간 전</span>
              </InforContainer>
            </UserInfoContainer>
            <div>
              <h3>정하게 하십니다.</h3>
            </div>
            <div>
              <span>조회수 10</span>
            </div>
          </Link>
        </Item>
      </Items>
    </Wrapper>
  );
}

export default Worship;
