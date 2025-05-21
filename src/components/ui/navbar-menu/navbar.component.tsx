// src/components/Navbar.tsx
import React from "react";
import { cn } from "../../../lib/utils";
import { Menu } from "./menu.component";
import { MenuItem } from "./menu-item.component";
import { NavbarProvider } from "./navbar.context";

interface NavbarProps {
  className?: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed bottom-1 inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}
    >
      <Menu>
        <MenuItem label="item1">
          <div>item content1</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = (props) => (
  <NavbarProvider>
    <NavbarComponent {...props} />
  </NavbarProvider>
);

export default React.memo(Navbar);
