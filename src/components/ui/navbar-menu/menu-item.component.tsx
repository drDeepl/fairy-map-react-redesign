// src/components/MenuItem.tsx
import React, { useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useNavbar } from "./navbar.context";
import { cn } from "../../../lib/utils";
import AnimatedGradientBoxWithSlide from "@/components/animated-gradient";

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
    y: -35,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const buttonVariants: Variants = {
  rest: {},
  hover: {
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const underlineVariants: Variants = {
  rest: {
    scaleX: 0,
    opacity: 0,
    originX: 0.5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    originX: 0.5,
    backgroundColor: "#FD746E",

    transition: {
      duration: 0.4,
      ease: [0.25, 0.8, 0.25, 1],
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
      className={`relative`}
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
          "cursor-pointer text-black hover:opacity-80 dark:text-white flex items-center bold p-2"
        )}
        whileTap={{ scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <span>{label}</span>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 rounded-t-xl"
          variants={underlineVariants}
        />
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
                <motion.div className="h-full p-4 w-max">{children}</motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}, areEqual);

MenuItem.displayName = "MenuItem";
