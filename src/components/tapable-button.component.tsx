import { motion, Variants } from "framer-motion";

interface TapableButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const TapableButton: React.FC<TapableButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
}) => {
  const buttonVariants: Variants = {
    initial: { scale: 1 },

    hover: { scale: 1.1 },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${className} font-semibold`}
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
