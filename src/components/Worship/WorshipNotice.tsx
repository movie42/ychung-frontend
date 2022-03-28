import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  width: 100%;
  padding: 0 0 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
  a {
    color: ${(props) => props.theme.fontColor};
    text-decoration: none;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

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

function WorshipNotice() {
  return (
    <Wrapper>
      <h1>광고</h1>
      <ListContainer>
        <ListItem>
          <Link to="#">
            <UserInfoContainer>
              <ImageContainer>
                <img src="" />
              </ImageContainer>
              <InfoContainer>
                <span>user name</span>
                <span>1시간 전</span>
              </InfoContainer>
            </UserInfoContainer>
            <div>
              <h3>아이템 제목입니다.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                fugiat voluptate aperiam repudiandae sit iure eaque veritatis
                illo praesentium, temporibus quo itaque quibusdam vel nisi
                suscipit. Autem soluta exercitationem iure.
              </p>
            </div>
            <div>
              <span>공감 20</span>
              <span>댓글 100</span>
            </div>
          </Link>
        </ListItem>
      </ListContainer>
    </Wrapper>
  );
}

export default WorshipNotice;
