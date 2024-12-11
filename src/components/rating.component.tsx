import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface StarRatingProps {
  onClickRate: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onClickRate }) => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  const replaceFilledIcon = (toReplace: string, start: number, end: number) => {
    const stars = document.getElementsByClassName("stars");

    const className = stars[0].getAttribute("class")?.split(" ");
    className[0] = toReplace;

    for (let i = start; i < end + 1; i++) {
      stars[i].setAttribute("class", className?.join(" "));
    }
  };

  const handleOnClickRate = (value: number) => {
    if (currentRating === value) {
      replaceFilledIcon("text-slate-50", 0, 4);
      setCurrentRating(null);
    } else {
      setCurrentRating(value);
      replaceFilledIcon("text-slate-50", value + 1, 4);
      replaceFilledIcon("text-orange-500", 0, value);
    }
    onClickRate(value);
  };

  return (
    <div className="flex justify-center space-x-1">
      {Array(5)
        .fill(1)
        .map((_, value: number) => {
          return (
            <div id="stars__container" key={value} className="cursor-pointer">
              <StarFilledIcon
                id={`star_${value.toString()}`}
                className="text-slate-50 size-6 stroke-orange-500 stars hover:text-orange-500"
                onClick={() => handleOnClickRate(value)}
                onMouseOver={() =>
                  replaceFilledIcon("text-orange-500", 0, value)
                }
                onMouseLeave={() => {
                  if (currentRating) {
                    replaceFilledIcon("text-slate-50", currentRating + 1, 4);
                    replaceFilledIcon("text-orange-500", 0, currentRating);
                  } else {
                    replaceFilledIcon("text-slate-50", value, 4);
                  }
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default StarRating;
