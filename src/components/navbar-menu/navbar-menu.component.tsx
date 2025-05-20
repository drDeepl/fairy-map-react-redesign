import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { TriangleDownIcon } from "@radix-ui/react-icons";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  label,
  children,
}: {
  setActive: (title: string) => void;
  active: string | null;
  label: string;
  children?: React.ReactNode;
}) => {
  const handleOnClickItem = () => {
    setActive(label);
  };
  return (
    <div onClick={handleOnClickItem} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {label}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          {active === label && (
            <div className="absolute bottom-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full p-4 w-max"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({ className, children }) => {
  return (
    <nav
      className={cn(
        "relative rounded-3xl border border-neutral-200 dark:bg-black dark:border-white/[0.2] bg-white shadow-2xl shrink-0 flex justify-center space-x-4 px-8 py-6",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="rounded-md shadow-2xl shrink-0"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
};
