import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

interface IParallaxProps {
  children: ReactNode;
  offset?: number;
  elementScrollY?: MotionValue<number>;
}

const Parallax = ({
  elementScrollY,
  children,
  offset = 50,
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
    [initial, final],
    [offset, -offset]
  );

  const y = useSpring(yRange, {
    stiffness: 400,
    damping: 90,
  });

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
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
