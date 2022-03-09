import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import styled from "styled-components";
import { useMediaQuery } from "../customHooks";

const HeaderContainer = styled.header`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    overflow-x: hidden;
    .menuBtn {
      position: absolute;
      width: 3.6rem;
      height: 3.6rem;
      top: 0.7rem;
      right: 2rem;
    }
  }
`;

const LogoSvg = styled.svg`
  width: 4.5rem;
  height: 4.5rem;
  fill: ${(props) => props.theme.basicColor};
`;

const Nav = styled(motion.nav)`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    padding: 0 1rem 0 0;
    width: 100%;
    .closeBtn {
      position: absolute;
      width: 3.6rem;
      height: 3.6rem;
      top: 0.7rem;
      right: 2rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 100%;
      li {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
    }
  }
`;

const LogoContainer = styled.div`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    margin-left: 1rem;
  }
`;

interface IProps {
  current?: boolean;
  to?: string;
}

const LinkButton = styled(Link)<IProps>`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    text-decoration: none;
    display: block;

    color: ${(props) =>
      props.current ? props.theme.basicColor : props.theme.fontColor};
  }
`;

const Items = styled.ul``;

const Item = styled.li``;

const menuVariants = {
  hide: {
    x: "100%",
  },
  solid: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: "100%",
  },
};

const Header: React.FC<RouteComponentProps> = ({ location }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery("(max-width:450px)");

  const pathname = window.location.pathname;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const menuBtn = () => {
    setOpen(true);
  };
  const closeBtn = () => {
    setOpen(false);
  };
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
      <FontAwesomeIcon className="menuBtn" icon={faBars} onClick={menuBtn} />
      <Nav
        variants={menuVariants}
        initial="hide"
        animate={open ? "solid" : undefined}
        exit={open ? "exit" : undefined}>
        <FontAwesomeIcon
          className="closeBtn"
          icon={faClose}
          onClick={closeBtn}
        />
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
