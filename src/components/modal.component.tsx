import React, { ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  disableOverlay?: boolean;
  overlayClassName?: string;
  modalPosition?: "center" | "top" | "bottom";
  allowOutsideInteraction?: boolean;
  container?: HTMLElement;
}

const ModalMotion: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  disableOverlay = false,
  overlayClassName = "",
  modalPosition = "center",
  allowOutsideInteraction = false,
  container,
}) => {
  // Определение позиционирования модального окна
  const getPositionClasses = () => {
    switch (modalPosition) {
      case "top":
        return "items-start pt-20";
      case "bottom":
        return "items-end pb-5";
      default:
        return "items-center";
    }
  };

  // Варианты анимации для модального окна
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Варианты анимации для overlay
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: disableOverlay ? 0 : 0.5 },
  };

  // Если модальное окно закрыто, не рендерим портал
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={`
              fixed 
              inset-0 
              z-50 
              bg-black/50 
              backdrop-blur-md
              ${overlayClassName}
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={!allowOutsideInteraction ? onClose : undefined}
            style={{
              pointerEvents: allowOutsideInteraction ? "none" : "auto",
            }}
          />

          {/* Модальное окно */}
          <motion.div
            className={`
              fixed 
              inset-0 
              z-50 
              flex 
              ${getPositionClasses()}
              justify-center
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            style={{
              pointerEvents: allowOutsideInteraction ? "none" : "auto",
            }}
          >
            <div
              className={`
                relative 
                bg-white 
                rounded-xl 
                shadow-2xl 
                max-w-xl                
                ${className}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              {onClose && (
                <button
                  className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
                  onClick={onClose}
                >
                  ✕
                </button>
              )}

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    container ? container : document.body
  );
};

export default ModalMotion;
