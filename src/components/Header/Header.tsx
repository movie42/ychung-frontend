import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Nav from "./Nav";
import { navAnimationVariants } from "@/animationVariants";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 1rem 2rem;
`;

const LogoContainer = styled.div`
  width: 6rem;
  height: 6rem;
  a {
    display: block;
    width: inherit;
    height: inherit;
  }
`;

const LogoSvg = styled.svg`
  fill: ${(props) => props.theme.color.primary400};
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  .menuBtn {
    position: absolute;
    width: 3.6rem;
    height: 3.6rem;
    top: 1rem;
    right: 2rem;
  }
  width: 6rem;
  height: 6rem;
`;

interface IProps {
  to?: string;
}

const NavWrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: white;
  padding: 0 1rem 0 0;
  width: 100%;

  .closeBtn {
    position: absolute;
    z-index: 100;
    width: 4rem;
    height: 4rem;
    top: 2.5rem;
    right: 3rem;
  }
`;

const LinkButton = styled(Link)<IProps>`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    text-decoration: none;
    display: block;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
`;

const Header = () => {
  const [menu, setMenu] = useState(false);

  const location = useLocation();

  const handleMenuBtn = () => {
    setMenu(true);
  };

  const handleCloseBtn = () => {
    setMenu(false);
  };

  useEffect(() => {
    setMenu(false);
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <LogoContainer>
        <LinkButton to="/">
          <LogoSvg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0  220 220"
          >
            <path
              className="cls-1"
              d="M141.81,26A81.9,81.9,0,1,0,71.1,164.78L60.29,175.59,84,199.27l53.12-53.12c1.61-1.38,3.2-2.81,4.72-4.34A81.88,81.88,0,0,0,141.81,26Z"
            />
          </LogoSvg>
        </LinkButton>
      </LogoContainer>
      <ButtonContainer>
        <AiOutlineMenu onClick={handleMenuBtn} className="menuBtn" />
      </ButtonContainer>
      <AnimatePresence>
        {menu && (
          <NavWrapper
            variants={navAnimationVariants}
            initial="init"
            animate="animate"
            exit="exit"
          >
            <AiOutlineClose onClick={handleCloseBtn} className="closeBtn" />
            <Nav setMenu={setMenu} />
          </NavWrapper>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
