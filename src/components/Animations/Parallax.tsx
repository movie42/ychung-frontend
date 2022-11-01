import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useReducedMotion,
  MotionValue
} from "framer-motion";

interface IParallaxProps {
  children: ReactNode;
  offset?: number;
  elementScrollY?: MotionValue<number>;
}

const Parallax = ({
  elementScrollY,
  children,
  offset = 100
}: IParallaxProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const ref: React.Ref<HTMLDivElement> = useRef(null);

  const { scrollY } = useViewportScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  const yRange = useTransform(
    elementScrollY ? elementScrollY : scrollY,
    [0, initial, final],
    [0, initial, final]
  );

  useLayoutEffect(() => {
    const element = ref.current;

    const onResize = () => {
      if (element) {
        setElementTop(
          element.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset
        );
        setClientHeight(window.innerHeight);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div ref={ref} style={{ opacity: yRange, translateY: yRange }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
