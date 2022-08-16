export const navAnimationVariants = {
  init: {
    y: "-100%",
  },
  animate: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
    },
  },
  exit: {
    y: "-100%",
  },
};
