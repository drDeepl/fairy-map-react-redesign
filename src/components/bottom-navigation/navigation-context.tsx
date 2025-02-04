import React, { createContext, useContext, useState } from "react";
import { NavigationContextType, BottomNavigationProps } from "./types";

// Создание контекста
export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

// Хук для использования контекста навигации
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a BottomNavigation");
  }
  return context;
};

// Провайдер контекста
export const NavigationProvider: React.FC<BottomNavigationProps> = ({
  children,
  initialTab = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};
