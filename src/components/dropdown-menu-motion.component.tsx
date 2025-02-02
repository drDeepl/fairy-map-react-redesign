import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// Типы для контекста Dropdown
interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

// Создание контекста
const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

// Хук для использования контекста
const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext должен использоваться внутри DropdownProvider"
    );
  }
  return context;
};

// Основной компонент Dropdown
interface DropdownProps {
  children: ReactNode;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({ children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Значения контекста
  const contextValue = {
    isOpen,
    toggleDropdown,
    closeDropdown,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className={`relative inline-block ${className}`}
        onBlur={closeDropdown}
        tabIndex={0}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Компонент кнопки-триггера
interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
}

const Trigger: FC<DropdownTriggerProps> = ({ children, className = "" }) => {
  const { isOpen, toggleDropdown } = useDropdownContext();

  return (
    <button
      onClick={toggleDropdown}
      className={`w-full text-left  bg-gray-100 rounded-md 
                 flex items-center justify-between 
                 hover:bg-gray-200 transition-colors ${className}`}
    >
      {children}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDownIcon className="size-5" />
      </motion.span>
    </button>
  );
};

// Компонент списка
interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

const Menu: FC<DropdownMenuProps> = ({ children, className = "" }) => {
  const { isOpen } = useDropdownContext();

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className={`absolute z-10 w-full mt-1 bg-white 
                     shadow-lg rounded-md overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Компонент элемента меню
interface DropdownItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
}

const Item: FC<DropdownItemProps> = ({
  children,
  onSelect,
  className = "",
}) => {
  const { closeDropdown } = useDropdownContext();

  const handleClick = () => {
    onSelect?.();
    closeDropdown();
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={handleClick}
      className={`px-4 py-2 hover:bg-gray-100 
  cursor-pointer transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};

export {
  Dropdown,
  Trigger as DropdownTrigger,
  Menu as DropdownMenu,
  Item as DropdownItem,
};
