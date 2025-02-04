import React from "react";
import { motion } from "framer-motion";
import { useNavigation } from "./navigation-context";
import { NavItemProps } from "./types";
import { navigationAnimations } from "./animations";

export const NavItem: React.FC<NavItemProps> = ({
  id,
  icon: Icon,
  label,
  children,
  className = "",
  onClick,
}) => {
  const { activeTab, setActiveTab } = useNavigation();
  const isActive = activeTab === id;

  const handleClick = () => {
    if (id) {
      if (onClick) {
        onClick();
      }
      setActiveTab(id);
    }
  };

  return (
    <motion.div
      className={`
        flex flex-col items-center justify-center 
        cursor-pointer relative w-full
        transition-all duration-300
        ${isActive ? "text-blue-500" : "text-gray-500"}
        ${className}
      `}
      onClick={handleClick}
      variants={navigationAnimations.itemVariants}
      whileTap="tap"
      whileHover="hover"
    >
      {/* Логика рендеринга NavItem */}
      {Icon && (
        <div className="flex flex-col items-center">
          <Icon className="w-6 h-6" />
          {label && (
            <motion.span
              className="mt-1 text-xs transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </div>
      )}

      {children}

      {isActive && (
        <motion.div
          className="absolute w-1 h-1 bg-blue-500 rounded-full -bottom-1"
          layoutId="activeDot"
        />
      )}
    </motion.div>
  );
};
