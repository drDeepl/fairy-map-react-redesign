import React, { ReactNode, useContext, createContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import TapableButton from "./tapable-button.component";

// Контекст для совместного управления состоянием
interface AccordionContextType {
  isOpen: boolean;
  toggleOpen: () => void;
}

const AccordionContext = createContext<AccordionContextType>({
  isOpen: true,
  toggleOpen: () => {},
});

// Styled-компоненты
const AccordionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
`;

const AccordionItemWrapper = styled(motion.div)`
  width: 100%;
`;

// Компонент корневого контейнера
interface AccordionRootProps {
  children: ReactNode;
  isOpen?: boolean;
  onChangeOpen: (isOpen: boolean) => void;
}

const AccordionRoot: React.FC<AccordionRootProps> = ({
  children,
  isOpen = false,
  onChangeOpen,
}) => {
  return (
    <AccordionContext.Provider
      value={{ isOpen, toggleOpen: () => onChangeOpen(isOpen) }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

// Кастомный хук для использования контекста
const useExpandable = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useExpandable must be used within an ExpandableRoot");
  }
  return context;
};

interface AccordionGridProps {
  showAfterHideItem?: number;
  children: ReactNode[];
  className?: string;
}

interface ToggleButtonProps {
  children?: ReactNode;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ children, className }) => {
  const { isOpen, toggleOpen } = useExpandable();

  return (
    <TapableButton
      className={`p-1 bg-slate-200 rounded-md text-slate-800 ${className}`}
      onClick={toggleOpen}
    >
      {children || (isOpen ? "показать" : "скрыть")}
    </TapableButton>
  );
};

// Основной компонент Grid
const AccordionContent: React.FC<AccordionGridProps> = ({
  children,
  showAfterHideItem = 0,
  className,
}) => {
  const { isOpen, toggleOpen } = useExpandable();

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [isOpen, toggleOpen]);

  // Безопасное преобразование children в массив
  const childrenArray = React.Children.toArray(children);

  // Варианты анимации с динамическим поведением
  const getItemVariants = (index: number) => ({
    closed: {
      opacity: index === showAfterHideItem ? 1 : 0,
      height: index === showAfterHideItem ? "auto" : 0,
      display: index === showAfterHideItem ? "block" : "none",
      transition: {
        duration: 0.3,
      },
    },

    open: {
      opacity: 1,
      height: "auto",
      display: "block",
      transition: {
        duration: 0.3,
      },
    },
  });

  return (
    <div className={`${className}`}>
      <AccordionContainer>
        <AnimatePresence>
          {childrenArray.map((child, index) => (
            <AccordionItemWrapper
              key={index}
              variants={getItemVariants(index)}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              exit="closed"
            >
              {child}
            </AccordionItemWrapper>
          ))}
        </AnimatePresence>
      </AccordionContainer>
    </div>
  );
};

export {
  AccordionRoot as Accordion,
  AccordionContent,
  ToggleButton as AccordionTrigger,
};
