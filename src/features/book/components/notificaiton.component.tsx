import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Типы для уведомлений
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  action?: React.ReactNode;
}

// Интерфейс для пропсов контейнера
interface NotifyContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  maxVisibleNotifications?: number;
  duration?: number;
}

interface TypeBarColors {
  [key: string]: {
    container: string;
    bar: string;
  };
}

// Компонент уведомления
const NotificationItem: React.FC<Notification & { onClose: () => void }> = ({
  id,
  type,
  message,
  onClose,
  action,
  duration = 5,
}) => {
  // Цвета для разных типов уведомлений
  const typeColors = {
    success: "border border-green-500 bg-green-100 text-green-500 ",
    error: "border border-red-500 bg-red-100 text-red-500 ",
    warning: "border border-yellow-500 bg-yellow-100 text-yellow-500",
    info: "border border-blue-500 bg-blue-100 text-blue-500 ",
  };

  const [timeLeft, setTimeLeft] = useState(duration);

  const typeBarColors: TypeBarColors = {
    success: {
      container: "border border-b-green-500 text-green-500 ",
      bar: "bg-green-500",
    },
    error: {
      container: "border border-b-red-500 text-red-500 bg-red-200",
      bar: "bg-red-500",
    },
    warning: {
      container: "border border-b-yellow-500 text-yellow-500 ",
      bar: "bg-yellow-500",
    },
    info: {
      container: "border border-b-blue-500 text-blue-500 ",
      bar: "bg-blue-500",
    },
  };

  // Эффект для обновления таймера
  useEffect(() => {
    let interval: any = null;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      onClose();
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Вычисление прогресса
  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className={`
        ${typeColors[type]} 
        
        
        rounded-t-lg 
        shadow-lg 
        mb-2 
        flex 
        flex-col
        items-center
        justify-between
        max-w-md
        w-full
        relative
      `}
    >
      <div className="w-full flex justify-between space-x-4 m-2 p-2">
        <span className="text-md">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-600 hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      </div>
      {action}
      <div className={`w-full h-2 ${typeBarColors[type].container}`}>
        <motion.div
          className={`h-2 ${typeBarColors[type].bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 1.25}%` }}
          transition={{
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

// Основной компонент контейнера уведомлений
const NotifyContainer: React.FC<NotifyContainerProps> = ({
  notifications,
  onRemove,
  maxVisibleNotifications = 1,
  duration = 5,
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
