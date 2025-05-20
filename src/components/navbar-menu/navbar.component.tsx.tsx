import { cn } from "../../lib/utils";
import React, { useState, Children } from "react";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "./navbar-menu.component";
import { ArrowBigDownIcon } from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const handleActive = (item: string | null) => {
    active === item ? setActive(null) : setActive(item);
  };
  return (
    <div
      onMouseLeave={() => setActive(null)} // resets the state
      className={cn(
        "fixed bottom-1 inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}
    >
      <Menu>
        <MenuItem setActive={handleActive} active={active} label="item1">
          <div>item content1</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default React.memo(Navbar);
