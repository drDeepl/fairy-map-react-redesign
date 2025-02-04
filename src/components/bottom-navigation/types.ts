import { ReactNode } from "react";

export interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface NavItemProps {
  id?: string;
  icon?: any;
  label?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  children: ReactNode;
  initialTab?: string;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}
