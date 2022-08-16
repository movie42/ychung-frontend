import React from "react";
import styled from "styled-components";
import { calculateDate } from "../../lib/utils/utilities/calculateDate";

const HeadInfoContainer = styled.div`
  box-sizing: border-box;
  padding: 0;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  h1 {
    font-size: 6rem;
    margin: 0;
    word-break: keep-all;
  }
  .noticeInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-size: 1.8rem;
    span {
      &:first-child {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-column: 1/4;
      }
      color: ${(props) => props.theme.color.gray400};
    }
  }
`;

interface IPageDetailModalHeader extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  creator?: {
    userName?: string;
  };
  views?: number;
  createdAt?: string;
}

const PageDetailModalHeader = ({ views, ...props }: IPageDetailModalHeader) => {
  const { title, createdAt, creator } = props;
  return (
    <HeadInfoContainer>
      <h1>{title}</h1>
      {props.children}
      <div className="noticeInfo">
        <span>글쓴이 : {creator?.userName}</span>
        <span>조회수 : {views}</span>
        <span>날짜 : {createdAt && calculateDate(createdAt)}</span>
      </div>
    </HeadInfoContainer>
  );
};

export default PageDetailModalHeader;
