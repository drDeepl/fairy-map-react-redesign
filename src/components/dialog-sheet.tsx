import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface DialogProps {
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const DialogSheet: React.FC<DialogProps> = ({
  onClose,
  children,
  className = "",
  contentClassName = "",
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: "-50%",
      y: "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const dialogNode = (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 bg-black/50 flex justify-center items-center z-[50] ${className}`}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className={`bg-white rounded-lg w-full max-w-xl max-h-[90%] shadow-xl absolute top-1/2 left-1/2 ${contentClassName}`}
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {onClose ? (
            <div className="flex flex-col">
              <div className="place-self-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="[&_svg]:size-5 text-slate-500"
                  onClick={onClose}
                >
                  <Cross1Icon />
                </Button>
              </div>
              <div className="flex flex-col">{children}</div>
            </div>
          ) : (
            <div className="flex flex-col">{children}</div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(dialogNode, document.body);
};

export default DialogSheet;
