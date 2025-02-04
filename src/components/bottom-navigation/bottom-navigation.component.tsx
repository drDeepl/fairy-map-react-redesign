import React from "react";
import { motion } from "framer-motion";
import { NavigationProvider } from "./navigation-context";
import { NavItem } from "./nav-item";
import { BottomNavigationProps, NavItemProps } from "./types";
import { navigationAnimations } from "./animations";

// Интерфейс для расширенного компонента
interface BottomNavigationComponent<P = object> extends React.FC<P> {
  Item?: React.FC<NavItemProps>;
}

export const BottomNavigation: BottomNavigationComponent<
  BottomNavigationProps
> = ({ children, initialTab = "", className = "", ref }) => {
  return (
    <NavigationProvider initialTab={initialTab}>
      <motion.nav
        ref={ref}
        initial={navigationAnimations.initial}
        animate={navigationAnimations.animate}
        transition={navigationAnimations.transition}
        className={`
          fixed bottom-0 left-0 right-0 
          bg-white shadow-lg 
          flex justify-around items-center 
          py-3 px-4 
          rounded-t-xl
          z-50
          ${className}
        `}
      >
        {children}
      </motion.nav>
    </NavigationProvider>
  );
};

// Статическое присваивание Item
BottomNavigation.Item = NavItem;
