export const scrollAnimationVariants = {
  init: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
    },
  },
  exit: {
    y: "-100%",
  },
};
