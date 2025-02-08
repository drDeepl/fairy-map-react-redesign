import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext должен использоваться внутри DropdownProvider"
    );
  }
  return context;
};

interface DropdownProps {
  children: ReactNode;
  className?: string;
  open?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  className = "",
  open = false,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const contextValue = {
    isOpen,
    toggleDropdown,
    closeDropdown,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const Trigger: FC<DropdownProps> = ({ children, className = "" }) => {
  const { isOpen, toggleDropdown } = useDropdownContext();

  return (
    <button
      onClick={toggleDropdown}
      className={`w-full text-left rounded-md 
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

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

const Menu: React.FC<DropdownMenuProps> = ({ children, className = "" }) => {
  const { isOpen } = useDropdownContext();
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    const checkDropdownPosition = () => {
      const dropdownEl = document.querySelector(".dropdown-menu");
      if (!dropdownEl) return;

      const rect = dropdownEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenUpward(spaceBelow < 200 && spaceAbove > 200);
    };

    if (isOpen) {
      checkDropdownPosition();
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transformOrigin: openUpward ? "bottom" : "top",
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transformOrigin: openUpward ? "bottom" : "top",
      scale: 1,
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
          className={`absolute z-10 w-full 
      ${openUpward ? "bottom-full mb-1" : "mt-1"} 
      bg-white shadow-lg rounded-md overflow-hidden 
      dropdown-menu ${className}`}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
