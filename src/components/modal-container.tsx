import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  zIndex?: number;
  children?: React.ReactNode;
}

const ModalContainer: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  zIndex,
  children,
}) => {
  const z = zIndex != undefined ? `z-[${zIndex}]` : "z-[60]";
  return open ? (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${z}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg"
      >
        <div className="header__modal-container">
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
          >
            <Cross1Icon />
          </Button>
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="content__modal-container">{children}</div>
      </motion.div>
    </div>
  ) : null;
};

export default ModalContainer;
