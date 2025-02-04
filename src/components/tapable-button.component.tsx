import { motion, Variants } from "framer-motion";

interface TapableButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const TapableButton: React.FC<TapableButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.button
      className={`${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default TapableButton;
