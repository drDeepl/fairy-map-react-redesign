import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";

import { useSelector } from "react-redux";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { start } from "repl";

interface StarRatingProps {
  commonRating: number;
  onClickRate: (value: number) => Promise<void>;
  onClickAuth: () => void;
}

interface RatingState {
  open: boolean;
  currentRating: number | null;
  load: boolean;
}

const filledColorClass = "text-orange-500";

const StarRating: React.FC<StarRatingProps> = ({
  commonRating,
  onClickRate,
  onClickAuth,
}) => {
  const { toast } = useToast();

  const { user } = useSelector((state: RootState) => state.auth);

  const [ratingState, setRatingState] = useState<RatingState>({
    open: false,
    currentRating: null,
    load: false,
  });

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
    if (!user) {
      toast({
        style: {
          border: "1.5px solid var(--deep-red)",
          right: "2rem",
        },
        title: "поставить оценку могу только авторизованные пользователи",
        action: <Button onClick={() => onClickAuth()}>войти</Button>,
      });
    } else {
      loadIcons(true);
      onClickRate(value + 1).then(() => {
        loadIcons(false);
      });
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
    <div className="flex justify-center space-x-1">
      <Toaster />
      <div
        id="stars__wrapper"
        className="flex justify-center items-center animate-flyin "
      >
        {Array(5)
          .fill(1)
          .map((_, value: number) => {
            return (
              <div id="stars__container" key={value} className="cursor-pointer">
                <Button
                  variant="link"
                  onClick={() => handleOnClickRate(value)}
                  onMouseOver={() => {
                    replaceFilledIcon("text-slate-50", 4);
                    replaceFilledIcon("text-orange-500", value);
                  }}
                  onMouseLeave={filledStarsCommonRating}
                >
                  <StarFilledIcon
                    id={`star-item-${value}`}
                    className="text-slate-50 size-6 stroke-orange-500 stars hover:text-orange-500"
                  />
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StarRating;
