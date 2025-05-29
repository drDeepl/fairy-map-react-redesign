import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cross1Icon } from "@radix-ui/react-icons";

const styles = {
  pageContainer: {
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
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 1rem",
              zIndex: 999,

              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              className=""
              style={{
                position: "relative",
                top: "2.2rem",
                left: "11.2rem",
                padding: "10px 20px",
                color: "white",

                borderRadius: "100%",
                cursor: "pointer",
                fontSize: "15px",
              }}
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
