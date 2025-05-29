import { motion, Variants } from "framer-motion";

import styled from "styled-components";
// Компонент для создания шайни эффекта

const StyledButton = styled(motion.button)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: background-color 0.3s ease;
`;

const ShinyOverlay = styled(motion.span)`
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    125deg,
    transparent 0%,
    #0000330f 50%,
    transparent 100%
  );
  transform: skewX(-50deg);
`;

interface TapableButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  shinyAnimate?: boolean;
}

const TapableButton: React.FC<TapableButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
  variant = "ghost",
  shinyAnimate = false,
}) => {
  const getVariantBtn = (variant: string) => {
    switch (variant) {
      case "primary":
        return "text-slate-800 bg-primary p-1 rounded-md";
      case "secondary":
        return "text-slate-800 bg-secondary p-2 rounded-md border-slate-300 border";
      case "ghost":
        return "bg-transparent";
      case "outline":
        return "border border-slate-500 rounded-md text-slate-800 p-1";
    }
  };

  const shinyVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const buttonVariants: Variants = {
    initial: { scale: 0.95 },

    hover: {
      scale: 1,
    },
    tap: {
      scale: 0.85,
      transition: { duration: 0.1 },
    },
  };

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      className={`relative font-semibold ${getVariantBtn(
        variant
      )} p-1 ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {shinyAnimate && (
        <ShinyOverlay
          variants={shinyVariants as any}
          initial="initial"
          animate="animate"
        />
      )}
      {children}
    </StyledButton>
  );
};

export default TapableButton;
