// src/components/MenuItem.tsx
import React, { useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useNavbar } from "./navbar.context";
import { cn } from "../../../lib/utils";

import { PlayCircleIcon } from "lucide-react";

interface MenuItemProps {
  label: string;
  children?: React.ReactNode;
}

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const buttonVariants: Variants = {
  rest: {
    border: "1px solid black",
    borderRadius: "100%",
  },
  hover: {
    border: "1px solid #FD746E",
    borderRadius: "100%",

    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const areEqual = (prevProps: MenuItemProps, nextProps: MenuItemProps) => {
  return prevProps.label === nextProps.label;
};

export const MenuItem = React.memo<MenuItemProps>(({ label, children }) => {
  const { active, setActive } = useNavbar();

  const handleClick = useCallback(() => {
    console.log(`on click ${label}`);
    if (active === label) {
      setActive(null);
    } else {
      setActive(label);
    }
  }, [active, label, setActive]);

  const isActive = active === label;

  return (
    <motion.div
      className={`relative flex z-[55]`}
      tabIndex={0}
      aria-expanded={isActive}
      aria-haspopup="true"
    >
      <motion.button
        onClick={handleClick}
        role="button"
        variants={buttonVariants}
        initial="rest"
        animate={isActive ? "hover" : ""}
        className={cn(
          "cursor-pointer text-black hover:opacity-80 dark:text-white flex items-center bold p-2 justify-center"
        )}
        whileTap={{ scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <PlayCircleIcon
          className={isActive ? "text-[#FD746E]" : "text-slate-500"}
        />
        <span>{label}</span>

        {/* <motion.div
          className="absolute -bottom-2 left-0 w-full h-1 rounded-t-xl"
          variants={underlineVariants}
        /> */}
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key={`menu-${label}`}
            layoutId={`active-${label}`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
              <motion.div
                layout
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl"
              >
                <motion.div className="h-full p-4">{children}</motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}, areEqual);

MenuItem.displayName = "MenuItem";
