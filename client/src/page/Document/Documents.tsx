import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;

const ItemsContainer = styled.div``;

const ItemContainer = styled.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
`;

function Documents() {
  return (
    <Wrapper>
      <h1>도큐멘트</h1>
      <p>청년부 회칙, 메뉴얼, 각종 신청서 등을 열람, 작성하는 곳입니다.</p>
      <ItemsContainer>
        <ItemContainer>
          <Link to="/documents/rule">
            <h3>2022년 청년부 회칙</h3>
            <p>
              청년부 회원의 권리와 의무, 임역원 선출, 재정 관리 방법 등을 기록한
              회칙을 확인하세요.
            </p>
            <span>자세한 내용 보기 →</span>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link to="/documents/menual">
            <h3>2022년 메뉴얼</h3>
            <p>청년부의 행사 방법 등을 기록한 행동 지침입니다.</p>
            <span>자세한 내용 보기 →</span>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link to="/documents/applications">
            <h3>서식 모음</h3>
            <p>새신자 카드, 교육 지원비, 행사 신청서 등 서식 모음입니다.</p>
            <span>자세한 내용 보기 →</span>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link to="/documents/account">
            <h3>재정</h3>
            <p>
              회원에게 공개됩니다. 열람이 되지 않는다면 임역원에게 문의해주시기
              바랍니다.
            </p>
            <span>자세한 내용 보기 →</span>
          </Link>
        </ItemContainer>
      </ItemsContainer>
    </Wrapper>
  );
}

export default Documents;
