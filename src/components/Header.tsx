import React from "react";

import {
  Link,
  RouteComponentProps,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoSvg = styled.svg`
  width: 4.5rem;
  height: 4.5rem;
  fill: ${(props) => props.theme.basicColor};
`;

const Nav = styled.nav`
  padding: 0 1rem 0 0;
  width: 80%;
  ul {
    li::first-child {
      margin-left: 0;
    }
    li {
      margin-left: 0.5rem;
    }
  }
`;

const LogoContainer = styled.div`
  margin-left: 1rem;
`;

interface IProps {
  current?: boolean;
  to?: string;
}

const LinkButton = styled(Link)<IProps>`
  text-decoration: none;
  display: block;

  color: ${(props) =>
    props.current ? props.theme.basicColor : props.theme.fontColor};
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  cursor: pointer;
`;

const Header: React.FC<RouteComponentProps> = ({ location }): JSX.Element => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LinkButton to="/">
          <LogoSvg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 220 200">
            <path
              className="cls-1"
              d="M141.81,26A81.9,81.9,0,1,0,71.1,164.78L60.29,175.59,84,199.27l53.12-53.12c1.61-1.38,3.2-2.81,4.72-4.34A81.88,81.88,0,0,0,141.81,26Z"
            />
          </LogoSvg>
        </LinkButton>
      </LogoContainer>
      <Nav>
        <Items>
          <Item>
            <LinkButton to="/notice" current={location.pathname === "/notice"}>
              공지
            </LinkButton>
          </Item>
          <Item>
            <LinkButton
              to="/worship"
              current={location.pathname === "/worship"}>
              예배
            </LinkButton>
          </Item>
          <Item>
            <LinkButton to="/blog" current={location.pathname === "/blog"}>
              블로그
            </LinkButton>
          </Item>
          <Item>
            <LinkButton
              to="/documents"
              current={location.pathname === "/documents"}>
              도큐멘트
            </LinkButton>
          </Item>
          <Item>
            <LinkButton to="/search" current={location.pathname === "/search"}>
              검색
            </LinkButton>
          </Item>
          <Item>
            <LinkButton to="/user" current={location.pathname === "/user"}>
              내 정보
            </LinkButton>
          </Item>
          <Item>
            <LinkButton to="/login" current={location.pathname === "/login"}>
              로그인
            </LinkButton>
          </Item>
          <Item>
            <LinkButton to="/join" current={location.pathname === "/join"}>
              회원가입
            </LinkButton>
          </Item>
        </Items>
      </Nav>
    </HeaderContainer>
  );
};

export default withRouter(Header);
