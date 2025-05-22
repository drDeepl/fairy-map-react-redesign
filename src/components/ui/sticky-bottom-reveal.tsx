import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cross1Icon } from "@radix-ui/react-icons";

// Стили можно вынести в CSS-модули или styled-components для лучшей организации
const styles = {
  pageContainer: {
    // padding: "20px",
    // background: "linear-gradient(to bottom, #fdfbfb, #ebedee)",
    fontFamily: "Arial, sans-serif",
  },
  stickyButton: {
    position: "absolute",
    bottom: "1%",
    left: "50%",
    // transform: 'translateX(-50%)', // Если кнопка имеет фиксированную ширину
    // Для кнопки, которая может менять ширину текста, лучше использовать flex для центрирования:
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // ---
    padding: "15px 30px",
    backgroundColor: "#007AFF", // Пример: синий цвет Apple
    color: "white",
    border: "none",
    borderRadius: "50px", // Делаем ее "таблеткой"
    cursor: "pointer",
    zIndex: 1000, // Убедимся, что кнопка поверх другого контента
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    // Важно для центрирования если left: '50%'
    // Для этого примера сделаем кнопку занимающей некую ширину, но центрированной
    // minWidth: '200px', // Минимальная ширина, если текст короткий
    // textAlign: 'center',
  },
  contentPanel: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,

    // backgroundColor: "white",
    // borderTopLeftRadius: "20px",
    // borderTopRightRadius: "20px",
    // boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.1)",
    padding: "0 1rem",
    zIndex: 999, // Чуть ниже кнопки, если кнопка должна оставаться "над" панелью
    // или выше, если панель перекрывает кнопку (тогда нужна кнопка закрытия в панели)
    overflowY: "auto", // Если контент внутри панели большой
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Центрируем контент внутри панели
  },
  closeButtonPanel: {
    position: "relative",
    top: "2.2rem",
    left: "11.2rem",
    padding: "10px 20px",
    color: "white",

    borderRadius: "100%",
    cursor: "pointer",
    fontSize: "15px",
  },
};

// Варианты анимации для кнопки (необязательно, но добавляет "живости")
const buttonVariants = {
  initial: { scale: 1, y: 0, opacity: 1 },
  hover: {
    scale: 1.05,
    y: -3,
    boxShadow: "0px 10px 25px rgba(0, 122, 255, 0.3)", // Тень в цвет кнопки
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

// Варианты анимации для панели контента
const panelVariants = {
  hidden: {
    y: "100%", // Начинает полностью за пределами экрана снизу
    opacity: 0,
    transition: {
      type: "tween", // Используем tween для выхода, чтобы было предсказуемее
      duration: 0.3,
      ease: "easeIn",
    },
  },
  visible: {
    y: "0%", // Плавно поднимается на свою позицию
    opacity: 1,
    transition: {
      type: "spring", // Spring для более "живого" появления
      damping: 25, // Демпфирование (как сильно пружина будет "колебаться")
      stiffness: 180, // Жесткость пружины
      // when: "beforeChildren", // Если есть дочерние анимированные элементы
      // staggerChildren: 0.1,  // Задержка для анимации дочерних элементов
    },
  },
};

interface StickyBottomRevealProps {
  isPanelOpen?: boolean;
  setIsPanelOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

const StickyBottomReveal: React.FC<StickyBottomRevealProps> = ({
  isPanelOpen = false,
  setIsPanelOpen,
  children,
}) => {
  //   const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Кнопка, которая всегда видна и прилипает к низу */}
      {/* Обернем кнопку в div для корректного центрирования с left: 50% и transform */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000, // Убедимся, что контейнер кнопки поверх всего
        }}
      ></div>

      {/* AnimatePresence необходим для анимации появления/исчезновения компонентов */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            id="content-panel-id" // ID для aria-controls
            key="content-panel" // Ключ важен для AnimatePresence
            style={styles.contentPanel}
            variants={panelVariants}
            initial="hidden" // Начальное состояние (из variants)
            animate="visible" // Конечное состояние при появлении (из variants)
            exit="hidden" // Состояние при исчезновении (из variants)
          >
            <button
              className=""
              style={styles.closeButtonPanel}
              onClick={togglePanel} // Закрываем панель по клику на эту кнопку
            >
              <Cross1Icon className="text-slate-900 size-4" />
            </button>
            <div className="flex flex-col justify-center items-center">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StickyBottomReveal;
