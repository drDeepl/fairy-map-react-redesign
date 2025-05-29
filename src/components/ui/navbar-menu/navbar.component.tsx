import React from "react";
import { cn } from "../../../lib/utils";
import { Menu } from "./menu.component";
import { MenuItem } from "./menu-item.component";
import { NavbarProvider } from "./navbar.context";
import BookPlayer from "@/features/book-player/book-player";

interface NavbarProps {
  className?: string;
  search?: React.ReactNode;
  children?: React.ReactNode;
}

const NavbarComponent: React.FC<NavbarProps> = ({
  className,
  children,
  search,
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-1 inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}
    >
      <div className="relative -bottom-[55px] -right-4 z-50">{search}</div>
      <Menu>
        <MenuItem label="">
          <div className="z-[55]">
            <BookPlayer />
          </div>
        </MenuItem>
      </Menu>
      <div className="absolute bottom-[5px] right-4 z-50">{children}</div>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = (props) => (
  <NavbarProvider>
    <NavbarComponent {...props} />
  </NavbarProvider>
);

export default React.memo(Navbar);
