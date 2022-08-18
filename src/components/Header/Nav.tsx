import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { loginState } from "@/lib/state";

const Items = styled(motion.ul)`
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
  display: block;
  color: ${(props) => props.theme.color.fontColorBlack};
  text-decoration: none;
`;

const Nav = () => {
  const { isLogin } = useRecoilValue(loginState);

  return (
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
        <LinkButton to="/education">교육</LinkButton>
      </Item>
      {/* <Item>
        <LinkButton to="/documents">도큐멘트</LinkButton>
      </Item> */}
      {/* <Item>
        <LinkButton to="/search">검색</LinkButton>
      </Item> */}
      {isLogin ? (
        <>
          {/* <Item>
            <LinkButton to="/user/1">내 정보</LinkButton>
          </Item> */}
          <Item>
            <LinkButton to="/logout">로그아웃</LinkButton>
          </Item>
        </>
      ) : (
        <>
          <Item>
            <LinkButton to="/login">로그인</LinkButton>
          </Item>
          {/* <Item>
            <LinkButton to="/join">회원가입</LinkButton>
          </Item> */}
        </>
      )}
    </Items>
  );
};

export default Nav;
