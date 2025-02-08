import { StarIcon } from "@radix-ui/react-icons";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

interface StarsProps {
  size?: number;
  totalStars?: number;
  currentRating: number;
  onClickStar: (rating: number) => void;
  className?: string;
}

const Stars: React.FC<StarsProps> = ({
  totalStars = 5,
  currentRating,
  onClickStar,
  className,
  size = 8,
}) => {
  const [hoverRating, setHoverRating] = useState(currentRating);

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <motion.div
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => handleStarHover(i)}
          onHoverEnd={() => handleStarHover(currentRating)}
          onClick={() => onClickStar(i)}
          className="cursor-pointer"
        >
          {i <= (hoverRating || currentRating) ? (
            <StarFilledIcon className={`text-orange-500 size-${size}`} />
          ) : (
            <StarIcon className={`text-orange-500 size-${size}`} />
          )}
        </motion.div>
      );
    }

    return stars;
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1, // Задержка для каждого элемента
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      key="star-rating-tooltip"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={`flex space-x-2 ${className}`}
    >
      {renderStars()}
    </motion.div>
  );
};

export default Stars;
