import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled-components для создания базового стиля кнопки
const StyledButton = styled(motion.button)`
  position: relative;
  padding: 12px 24px;
  border: none;
  background-color: #4a4a4a;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a5a5a;
  }
`;

// Компонент для создания шайни эффекта
const ShinyOverlay = styled(motion.span)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: rotate(-45deg);
`;

// Интерфейс пропсов для типизации
interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Основной компонент кнопки
const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  // Анимация шайни эффекта
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

  // Анимация нажатия кнопки
  const buttonVariants = {
    initial: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  return (
    <StyledButton
      variants={buttonVariants}
      initial="initial"
      whileTap="pressed"
      onClick={onClick}
      disabled={disabled}
      aria-label="Shiny Button"
    >
      <ShinyOverlay
        variants={shinyVariants}
        initial="initial"
        animate="animate"
      />
      {children}
    </StyledButton>
  );
};

export default ShinyButton;
