import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface StarProps {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface UseStarGeneratorResult {
  stars: StarProps[];
  generateStars: (beforeGenerateCallback?: () => void) => void;
}

const generateUniqueId = (): string =>
  `star-${Math.random().toString(36).substring(2, 11)}`;

const STAR_COLORS = ["#FF6600"];

const StarParticle = React.memo<StarProps>(({ x, y, size, color, id }) => {
  const starVariants: Variants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      },
      animate: {
        opacity: [1, 0.7, 0],
        scale: [0, 1.2, 1.5],
        x: [0, x, x * 1.5],
        y: [0, y, y * 1.5],
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        scale: 0,
      },
    }),
    [x, y]
  );

  return (
    <motion.div
      key={id}
      className="absolute"
      style={{
        color,
        width: `${size}px`,
        height: `${size}px`,
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={starVariants}
    >
      ★
    </motion.div>
  );
});

const useStarGenerator = (): UseStarGeneratorResult => {
  const [stars, setStars] = useState<StarProps[]>([]);

  const generateStars = useCallback((beforeGenerateCallback?: () => void) => {
    beforeGenerateCallback?.();

    const newStars: StarProps[] = Array.from({ length: 15 }, () => ({
      id: generateUniqueId(),
      x: Math.random() * 500 - 150,
      y: Math.random() * 500 - 50,
      size: Math.random() * 20 + 5,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));

    setStars(newStars);

    const timeoutId = setTimeout(() => {
      setStars([]);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return { stars, generateStars };
};

interface MagicStarButtonProps {
  children?: React.ReactNode;
  onStarGenerate?: () => void;
}

const MagicStarButton: React.FC<MagicStarButtonProps> = ({
  children,
  onStarGenerate,
}) => {
  const { stars, generateStars } = useStarGenerator();

  const buttonVariants: Variants = useMemo(
    () => ({
      initial: { scale: 1 },
      hover: { scale: 1.05 },
      tap: {
        scale: 0.95,
        transition: { duration: 0.1 },
      },
    }),
    []
  );

  const handleGenerateStars = () => {
    generateStars(onStarGenerate);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence mode="wait">
            {stars.map((star) => (
              <StarParticle key={star.id} {...star} />
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          className="relative z-10 font-bold rounded-full shadow-2xl"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleGenerateStars}
        >
          {children}
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(MagicStarButton);
