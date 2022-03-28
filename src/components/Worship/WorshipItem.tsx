import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IWorshipItems } from "./Worship";

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

const Item = styled.li`
  padding: 0 0 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
`;

interface WorshipItems {
  worship: IWorshipItems;
}

function WorshipItem({ worship }: WorshipItems): React.ReactElement {
  const { _id, title, creator, views, createdAt } = worship;

  return (
    <Item>
      <Link to={`/worship/${_id}`}>
        <UserInfoContainer>
          <ImageContainer>
            <img src="" alt="" />
          </ImageContainer>
          <InforContainer>
            <span>{creator}</span>
            <span>{createdAt}</span>
          </InforContainer>
        </UserInfoContainer>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <span>조회수 {views}</span>
        </div>
      </Link>
    </Item>
  );
}

export default WorshipItem;
