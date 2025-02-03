import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

interface DialogProps {
  onClose: () => void;
  children?: React.ReactNode;
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
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const dialogNode = (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex bg-slate-800 justify-center items-center z-[50] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-white rounded-lg max-w-xl max-h-[90%] shadow-md ${contentClassName}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
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
          <div className="p-4">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );

  return ReactDOM.createPortal(dialogNode, document.body);
};

export default DialogSheet;
