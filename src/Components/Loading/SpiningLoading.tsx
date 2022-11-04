import React from "react";
import styled, { keyframes } from "styled-components";

interface ISpiningLoadingProps {
  message: string;
}

const SpiningLoading = ({ message }: ISpiningLoadingProps) => {
  return (
    <Wrapper>
      <span className="loading-title">{message}</span>
      <span className="loading-ball"></span>
    </Wrapper>
  );
};

export default SpiningLoading;

const loadingKeyframes = keyframes`
  0%{
    rotate: 0deg
  }
  
  100%{
    rotate: 360deg ;
  }
`;
const opacityKeyframes = keyframes`
  0% {
    background-position:200% center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  position: absolute;
  top: 5.7rem;
  right: 1rem;
  z-index: 1000;
  width: 100%;
  height: 2rem;
  .loading-title {
    position: relative;
    padding-top: 0.2rem;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: ${(props) => props.theme.color.gray400};
    text-align: center;
    background: linear-gradient(
      to right,
      #ff0000 5%,
      #fff 20%,
      #fff 80%,
      #ff2200 95%
    );
    background-clip: text;
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${opacityKeyframes} 2s linear infinite;
  }

  .loading-ball {
    border: 0.5rem solid transparent;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, white 0%, red 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    animation: ${loadingKeyframes} 2s linear infinite;
  }
`;
