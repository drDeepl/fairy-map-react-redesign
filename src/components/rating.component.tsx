import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Toaster } from "@/components/ui/toaster";

interface StarRatingProps {
  commonRating: number;
  onClickRate: (value: number) => Promise<void>;
}

const filledColorClass = "text-orange-500";

const StarRating: React.FC<StarRatingProps> = ({
  commonRating,
  onClickRate,
}) => {
  const [load, setLoad] = useState<boolean>(false);

  const replaceFilledIcon = (toReplace: string, end: number) => {
    const stars = document.getElementsByClassName("stars") as HTMLCollectionOf<
      SVGAElement
    >;

    const className = stars[0].getAttribute("class")?.split(" ");
    if (className) {
      className[0] = toReplace;
      for (let i = 0; i < end + 1; i++) {
        stars.item(i)?.setAttribute("class", className.join(" "));
      }
    }
  };

  const loadIcons = (load: boolean) => {
    for (let i = 0; i < 5; i++) {
      document
        .getElementById(`star-item-${i}`)
        ?.setAttribute(
          "class",
          `text-slate-50 size-6 stroke-orange-500 stars hover:text-orange-500 ${
            load ? "animate-pulse" : ""
          }`
        );
    }
  };

  const handleOnClickRate = async (value: number) => {
    try {
      loadIcons(true);
      setLoad(true);
      await onClickRate(value + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
      loadIcons(false);
    }
  };

  const filledStarsCommonRating = () => {
    replaceFilledIcon("text-slate-50", 4);
    replaceFilledIcon(filledColorClass, commonRating - 1);
  };

  useEffect(() => {
    filledStarsCommonRating();
  }, [commonRating]);

  return (
    <div className="flex items-center">
      <Toaster />
      <div
        id="stars__wrapper"
        className="flex justify-center items-center animate-flyin space-x-4"
      >
        {Array(5)
          .fill(1)
          .map((_, value: number) => {
            return (
              <div id="stars__container" key={value} className="cursor-pointer">
                <Button
                  variant="link"
                  className="p-1"
                  onClick={() => handleOnClickRate(value)}
                  onMouseOver={() => {
                    if (!load) {
                      replaceFilledIcon("text-slate-50", 4);
                      replaceFilledIcon("text-orange-500", value);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!load) {
                      filledStarsCommonRating();
                    }
                  }}
                >
                  <StarFilledIcon
                    id={`star-item-${value}`}
                    className="text-slate-50 size-4 stroke-orange-500 stars hover:text-orange-500"
                  />
                </Button>
              </div>
            );
          })}
      </div>
      <span className="italic text-orange-500 ml-1 cursor-default text-sm">
        ( {Math.round((commonRating + Number.EPSILON) * 100) / 100} )
      </span>
    </div>
  );
};

export default StarRating;
