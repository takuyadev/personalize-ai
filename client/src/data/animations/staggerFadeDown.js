export const staggerDownParent = {
  initial: {
    opacity: 0,
    y: -25,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1.0],
      staggerChildren: 0.2,
    },
  },
};

export const staggerDownItem = {
  initial: {
    opacity: 0,
    y: -25,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};
