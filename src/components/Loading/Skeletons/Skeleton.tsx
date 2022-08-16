import React from "react";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(100rem);
  }
`;

const Item = styled.div<ISkeletonProps>`
  width: ${(props) => props.skeletonBoxWidth};
  height: ${(props) => props.skeletonBoxHeight};
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: inherit;
    background: linear-gradient(to right, #d0d0d0, #fff, #d0d0d0);
    animation: 1.5s ${loading} infinite linear;
  }
`;

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  skeletonBoxWidth: string;
  skeletonBoxHeight: string;
}

const Skeleton = ({
  skeletonBoxWidth,
  skeletonBoxHeight,
  ...props
}: ISkeletonProps) => {
  return (
    <Item
      skeletonBoxWidth={skeletonBoxWidth}
      skeletonBoxHeight={skeletonBoxHeight}
      {...props}
    />
  );
};

export default Skeleton;
