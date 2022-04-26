import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 8rem;
  .title-container {
    margin-bottom: 2rem;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 24rem;
`;
const ContentsSection = styled.section`
  grid-column: 2/4;
`;
const Aside = styled.aside`
  grid-column: 1;
`;

const ItemsContainer = styled.div``;

const ItemContainer = styled.div``;

function Documents() {
  return (
    <Wrapper>
      <div className="title-container">
        <h1>여기에는 메뉴의 이름이 들어가야합니다.</h1>
      </div>
      <Layout>
        <Aside>
          <ItemsContainer>
            <ItemContainer>
              <Link to="/documents/rule">회칙</Link>
            </ItemContainer>
            <ItemContainer>
              <Link to="/documents/menual">메뉴얼</Link>
            </ItemContainer>
            <ItemContainer>
              <Link to="/documents/applications">신청서</Link>
            </ItemContainer>
            <ItemContainer>
              <Link to="/documents/account">재정</Link>
            </ItemContainer>
          </ItemsContainer>
        </Aside>
        <ContentsSection>
          <Outlet />
        </ContentsSection>
      </Layout>
    </Wrapper>
  );
}

export default Documents;
