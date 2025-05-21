import React from "react";
import { cn } from "../../../lib/utils";

interface MenuProps {
  className?: string;
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = React.memo(
  ({ className, children }) => {
    return (
      <nav
        className={cn(
          "relative rounded-3xl border border-neutral-300 dark:bg-black dark:border-white/10 bg-white shadow-2xl shrink-0 flex justify-center space-x-4 px-8 py-2",
          className
        )}
      >
        {children}
      </nav>
    );
  }
);

Menu.displayName = "Menu";
