import React, {
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence, Variants, MotionStyle } from "framer-motion";
import { debounce } from "lodash";
interface PopoverProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const PopoverMotion: React.FC<PopoverProps> = React.memo(
  ({ open, x, y, onClose, children, className = "" }) => {
    const [popoverDimensions, setPopoverDimensions] = useState({
      width: 0,
      height: 0,
    });

    const popoverRef = React.useRef<HTMLDivElement | null>(null);

    const updateDimensions = useCallback(() => {
      if (popoverRef.current) {
        const { offsetWidth, offsetHeight } = popoverRef.current;
        setPopoverDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }, [children]);

    useEffect(() => {
      updateDimensions();
    }, [children, updateDimensions]);

    const popoverVariants = useMemo<Variants>(
      () => ({
        hidden: {
          opacity: 0,
          scale: 0.9,
          transition: {
            duration: 0.2,
            type: "tween",
          },
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        },
      }),
      []
    );

    const handleClose = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
      },
      [onClose]
    );

    const handlePopoverClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);

    const calculatePopoverPosition = useCallback(() => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const popoverHeight = popoverDimensions.height;

      let newY = y;

      if (y + popoverHeight > windowHeight) {
        newY = y - popoverHeight - 10;
      }

      if (newY < 0) {
        newY = 50;
      }

      return {
        position: "absolute",
        top: `${newY}px`,
        left: `${Math.min(
          Math.max(x - popoverDimensions.width / 2, 0),
          windowWidth - popoverDimensions.width
        )}px`,
      };
    }, [x, y, popoverDimensions]);

    useEffect(() => {
      const handleResize = debounce(() => {
        updateDimensions();
      }, 100);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [updateDimensions]);

    return (
      <AnimatePresence mode="wait">
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleClose}
          >
            <motion.div
              ref={popoverRef}
              key="popover"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popoverVariants}
              style={calculatePopoverPosition() as MotionStyle}
              className={`
                bg-white 
                shadow-2xl 
                rounded-lg
                p-2       
                      
                
                ${className}
              `}
              onClick={handlePopoverClick}
              // Улучшение производительности
              layout
              layoutId="popover"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);
export default PopoverMotion;
