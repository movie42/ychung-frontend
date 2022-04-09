import React, { useEffect, useState } from "react";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  padding: 0.2rem;
  .menuBtn {
    position: absolute;
    width: 3.6rem;
    height: 3.6rem;
    top: 0.7rem;
    right: 2rem;
  }
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
  fill: ${(props) => props.theme.basicColor};
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  width: 6rem;
  height: 6rem;
`;

interface IProps {
  to?: string;
}

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  padding: 0 1rem 0 0;
  width: 100%;
  z-index: 1;
  .closeBtn {
    position: absolute;
    width: 3.6rem;
    height: 3.6rem;
    top: 0.7rem;
    right: 2rem;
  }
`;

const LinkButton = styled(Link)<IProps>`
  @media (max-width: ${(props) => props.theme.screen.mobile}) {
    text-decoration: none;
    display: block;
    color: ${(props) => props.theme.fontColor};
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
            viewBox="0 0  220 220">
            <path
              className="cls-1"
              d="M141.81,26A81.9,81.9,0,1,0,71.1,164.78L60.29,175.59,84,199.27l53.12-53.12c1.61-1.38,3.2-2.81,4.72-4.34A81.88,81.88,0,0,0,141.81,26Z"
            />
          </LogoSvg>
        </LinkButton>
      </LogoContainer>
      <ButtonContainer>
        <FontAwesomeIcon
          viewBox="-100 0 448 512"
          onClick={handleMenuBtn}
          className="menuBtn"
          icon={faBars}
        />
      </ButtonContainer>
      {menu && (
        <NavWrapper>
          <FontAwesomeIcon
            onClick={handleCloseBtn}
            className="closeBtn"
            icon={faClose}
          />
          <Nav />
        </NavWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
