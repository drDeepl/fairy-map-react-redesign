import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cross1Icon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

interface StarRatingProps {
  currentRating: number;
  onClickStar: (value: number) => Promise<number>;
}

const StarRating: React.FC<StarRatingProps> = ({
  currentRating,
  onClickStar,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(currentRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
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
          {isExpanded && i <= (hoverRating || rating) ? (
            <StarFilledIcon className="w-8 h-8 text-orange-500" />
          ) : (
            <StarIcon className="w-8 h-8 text-gray-300" />
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

  return (
    <div className="flex items-center space-x-2">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            key="initial-star"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={initialStarVariants}
            onClick={handleStarClick}
            className="cursor-pointer flex items-center space-x-1"
          >
            <StarIcon className="size-8 text-orange-500" />
            <motion.span className="text-gray-400 italic text-sm">
              ({Math.round((currentRating + Number.EPSILON) * 100) / 100}/
              {totalStars})
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            key="star-rating"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-1"
          >
            {renderStars()}

            <Cross1Icon
              className="text-gray-500 siz-7 cursor-pointer self-center"
              onClick={() => setIsExpanded(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarRating;
