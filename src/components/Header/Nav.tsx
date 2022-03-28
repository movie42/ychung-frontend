import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Items = styled.ul`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin: 0 2rem;
  }
`;

const Item = styled.li`
  font-size: 4.3rem;
  margin-top: 1.4rem;
`;

interface IProps {
  to?: string;
}

const LinkButton = styled(Link)<IProps>`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    text-decoration: none;
    display: block;
    color: ${(props) => props.theme.fontColor};
  }
`;

const Nav = () => {
  return (
    <>
      <Items>
        <Item>
          <LinkButton to="/notice">공지</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/worship">예배</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/blog">블로그</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/documents">도큐멘트</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/search">검색</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/user/1">내 정보</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/login">로그인</LinkButton>
        </Item>
        <Item>
          <LinkButton to="/join">회원가입</LinkButton>
        </Item>
      </Items>
    </>
  );
};

export default Nav;
