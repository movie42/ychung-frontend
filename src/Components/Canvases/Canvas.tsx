import React from "react";

type ICanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

const Canvas = (props: ICanvasProps) => {
  return <canvas {...props}></canvas>;
};

export default Canvas;
