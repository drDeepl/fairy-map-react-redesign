import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Интерфейс для опций выпадающего списка
interface Option {
  value: string;
  label: string;
}

// Интерфейс пропсов компонента
interface DropdownBoxProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({
  options,
  placeholder = "Выберите значение",
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Обработчик выбора опции
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Вызываем колбэк onChange, если передан
    if (onChange) {
      onChange(option.value);
    }
  };

  // Анимация для контейнера
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  // Анимация для опций
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
  };

  return (
    <div className={`relative w-64 ${className}`}>
      {/* Кнопка выбора */}
      <motion.button
        className={`
          w-full 
          px-4 
          py-2 
          text-left 
          bg-white 
          border 
          ${isOpen ? "border-slate-950" : "border-slate-300"}
          rounded-md 
          flex 
          justify-between 
          items-center 
          shadow-sm 
        `}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? "text-black" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.button>

      {/* Выпадающий список */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="select-options"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="
              absolute 
              z-10 
              w-full 
              mt-1 
              bg-white 
              border 
              border-gray-300 
              rounded-md 
              shadow-lg 
              max-h-60 
              overflow-auto 
              focus:outline-none
            "
            role="listbox"
          >
            {options.map((option, index) => (
              <motion.li
                key={option.value}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                className="
                  px-4 
                  py-2 
                  text-gray-900 
                  cursor-pointer 
                  hover:bg-gray-100 
                  focus:bg-gray-100 
                  focus:outline-none
                "
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownBox;
