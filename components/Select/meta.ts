export const arrowVariants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};

export const menuVariants = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};


export const list = [
  "Australia",
  "Columbia",
  "Denmark",
  "Germany",
  "Indonesia",
  "Nigeria",
  "Belgium",
  "Rome",
  "Greece",
  "Iceland",
];