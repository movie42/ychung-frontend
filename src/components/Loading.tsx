import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const LogoSvg = styled(motion.svg)`
  fill: ${(props) => props.theme.basicColor};
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.white};
  z-index: 20;
  h1 {
    position: fixed;
    color: white;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
`;
const logoVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const Loading = () => {
  return (
    <Container>
      <h1>로딩중...</h1>
      <LogoSvg
        variants={logoVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        id="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-100 -50  360 360">
        <path
          className="cls-1"
          d="M141.81,26A81.9,81.9,0,1,0,71.1,164.78L60.29,175.59,84,199.27l53.12-53.12c1.61-1.38,3.2-2.81,4.72-4.34A81.88,81.88,0,0,0,141.81,26Z"
        />
      </LogoSvg>
    </Container>
  );
};

export default Loading;
