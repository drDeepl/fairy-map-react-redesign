import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Типы для уведомлений
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  action?: React.ReactNode;
}

// Интерфейс для пропсов контейнера
interface NotifyContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  maxVisibleNotifications?: number;
}

// Компонент уведомления
const NotificationItem: React.FC<Notification & { onClose: () => void }> = ({
  id,
  type,
  message,
  onClose,
  action,
}) => {
  // Цвета для разных типов уведомлений
  const typeColors = {
    success: "border border-green-500 bg-green-100 text-green-500 ",
    error: "border border-red-500 bg-red-100 text-red-500 ",
    warning: "border border-yellow-500 bg-yellow-100 text-yellow-500",
    info: "border border-blue-500 bg-blue-100 text-blue-500 ",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className={`
        ${typeColors[type]} 
        px-4 
        py-4
        rounded-lg 
        shadow-lg 
        mb-2 
        flex 
        flex-col
        items-center
        justify-between
        max-w-md
        w-full
      `}
    >
      <div className="w-full flex justify-between space-x-4">
        <span className="text-md">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-600 hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      </div>
      {action}
    </motion.div>
  );
};

// Основной компонент контейнера уведомлений
const NotifyContainer: React.FC<NotifyContainerProps> = ({
  notifications,
  onRemove,
  maxVisibleNotifications = 1,
}) => {
  // Усечение количества видимых уведомлений
  const visibleNotifications = notifications.slice(0, maxVisibleNotifications);

  return (
    <div
      className="
        absolute 
        top-4 
        left-0
        z-[60] 
        flex 
        flex-col 
        items-end
      "
    >
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onClose={() => onRemove(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotifyContainer;
