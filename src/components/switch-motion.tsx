import React from "react";
import { motion } from "framer-motion";

interface SwitchMotionProps {
  isOn: boolean;
}

const switchVariants = {
  on: { x: 20 }, // Настройте, чтобы идеально подогнать под размер кнопки
  off: { x: 0 },
};

const SwitchMotion: React.FC<SwitchMotionProps> = ({ isOn }) => {
  return (
    <motion.div
      className={`flex items-center justify-center w-10 h-5 rounded-full cursor-pointer relative transition-colors duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
        initial={false}
        animate={isOn ? "on" : "off"}
        variants={switchVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};

export default SwitchMotion;
