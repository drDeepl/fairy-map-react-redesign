import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  action?: React.ReactNode;
}

interface NotifyContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  maxVisibleNotifications?: number;
  duration?: number;
}

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
    error: "border border-red-500 text-red-500 ",
    warning: "border border-yellow-500 bg-yellow-100 text-yellow-500",
    info: "border border-blue-500 bg-blue-100 text-blue-500 ",
  };

  const [timeLeft, setTimeLeft] = useState(duration);

  const typeCircleColors = {
    success: "stroke-green-500",
    error: "stroke-red-500",
    warning: "stroke-yellow-500",
    info: "stroke-blue-500",
  };

  // Эффект для обновления таймера
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (interval) clearInterval(interval);
      onClose();
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className={`
        ${typeColors[type]}  
        bg-neutral-50
        rounded-md
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
      <div className="w-full flex justify-between items-center space-x-4 mx-2 px-2 pt-4">
        <span className="text-md font-semibold">{message}</span>
        <div className="relative">
          <motion.svg
            viewBox="0 0 200 200"
            className="transform -rotate-90 size-12"
          >
            {/* Задний фон круга */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className="stroke-gray-300 fill-none"
              strokeWidth="20"
            />

            {/* Анимированный прогресс круга */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              className={`${typeCircleColors[type]} fill-none content-[${
                timeLeft % 60
              }]`}
              strokeWidth="20"
              strokeDasharray="565.48"
              strokeDashoffset={`calc(565.48 - (565.48 * ${
                progress * 1.25
              }) / 100)`}
              animate={{
                strokeDashoffset: `calc(565.48 - (565.48 * ${
                  progress * 1.25
                }) / 100)`,
              }}
              transition={{
                duration: 1,
                ease: "linear",
              }}
            />
          </motion.svg>
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="absolute flex items-center top-1.5 left-1.5 [&_svg]:size-6 rounded-full text-slate-800"
          >
            ✕
          </Button>
        </div>
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
        w-md
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
