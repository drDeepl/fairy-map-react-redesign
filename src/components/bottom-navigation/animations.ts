export const navigationAnimations = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
  itemVariants: {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  },
};
