import React, { useState, useRef } from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

import { CaretDownIcon } from "@radix-ui/react-icons";
import TapableButton from "./tapable-button.component";

// Styled компоненты для улучшенного дизайна
const NavContainer = styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavContent = styled.div`
  margin: 0;
`;

interface ExpandableModalProps {
  open?: boolean;
  compact: boolean;
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const ExpandableModal: React.FC<ExpandableModalProps> = ({
  compact,
  onClose,
  open = true,
  className = "",
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // const [compact, setCompact] = useState(false);

  // Анимация навигации
  const overlayVariants = {
    visible: {
      height: compact ? "auto" : "100%",
      width: compact ? "32rem" : "100%",
      x: compact ? "-50%" : "0",
      left: compact ? "50%" : "0",
      y: compact
        ? `${window.innerHeight - overlayRef.current?.clientHeight - 20}px`
        : "0",
      opacity: 1,
      transition: {
        type: "tween",
        stiffness: 300,
        damping: 20,
      },
    },
    hidden: {
      x: "0",
      y: "0",
      left: "0",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <NavContainer
      ref={overlayRef}
      variants={overlayVariants}
      animate={open ? "visible" : "hidden"}
      initial="visible"
      className="rounded-md"
    >
      <NavContent
        className={`w-full max-w-lg bg-slate-100 rounded-md ${className}`}
      >
        {onClose && (
          <div className="flex justify-end">
            <TapableButton className="flex items-center justify-center border rounded-md bg-slate-100 border-slate-500 size-9">
              <CaretDownIcon className="size-8" />
            </TapableButton>
          </div>
        )}
        <div className="relative">{children}</div>
      </NavContent>
    </NavContainer>
  );
};

export default ExpandableModal;
