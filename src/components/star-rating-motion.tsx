import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, StarFilledIcon, Cross1Icon } from "@radix-ui/react-icons";

import TapableButton from "./tapable-button.component";

interface StarRatingProps {
  className?: string;
  currentRating: number;
  onClickStar: (rating: number) => Promise<number>;
}

const StarRating: React.FC<StarRatingProps> = ({
  className,
  currentRating,
  onClickStar,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(currentRating - 1);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStarHover = (value: number) => {
    if (isExpanded) {
      setHoverRating(value);
    }
  };

  const handleStarSelect = async (value: number) => {
    if (isExpanded) {
      const newRating = await onClickStar(value);
      setRating(newRating);
      setIsExpanded(false);
    }
  };

  const totalStars = 5;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => handleStarHover(i)}
          onHoverEnd={() => handleStarHover(rating)}
          onClick={() => handleStarSelect(i)}
          className="cursor-pointer"
        >
          {i <= (hoverRating || rating) ? (
            <StarFilledIcon className="text-orange-500 size-8" />
          ) : (
            <StarIcon className="text-gray-300 size-8" />
          )}
        </motion.div>
      );
    }

    return stars;
  };

  const initialStarVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      x: -123,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: -5,
      x: -123,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={`relative flex items-center space-x-2 ${className} bg-[inherit] rounded-full p-1`}
      onBlur={() => setIsExpanded(false)}
    >
      <AnimatePresence>
        <motion.div
          key="initial-star"
          initial="hidden"
          animate="visible"
          variants={initialStarVariants}
          onClick={handleStarClick}
          className="flex flex-col items-center space-x-1 cursor-pointer"
        >
          <TapableButton>
            <StarFilledIcon className="text-orange-500 size-8" />
          </TapableButton>
        </motion.div>

        {isExpanded && (
          <motion.div
            key="star-rating-tooltip"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
            className="absolute left-0 z-10 flex items-center px-4 py-2 mt-2 space-x-4 bg-[inherit] rounded-lg shadow-lg top-full"
          >
            {renderStars()}
            <Cross1Icon
              className="self-center text-gray-300 cursor-pointer size-4"
              onClick={() => setIsExpanded(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarRating;
