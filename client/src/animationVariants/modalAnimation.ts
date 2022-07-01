export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.3,
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
  enter: {
    y: 0,
    transition: {
      type: "tween",
    },
  },
  exit: {
    y: "100%",
  },
};
