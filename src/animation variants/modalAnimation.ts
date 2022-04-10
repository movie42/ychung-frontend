export const opacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const movingCard = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
  exit: {
    y: "100%",
  },
};
