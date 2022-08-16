import React, { useRef } from "react";

interface ICanvasProps
  extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {}

const Canvas = (props: ICanvasProps) => {
  return <canvas {...props}></canvas>;
};

export default Canvas;
