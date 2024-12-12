import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from "@/app/store";

import { useSelector, useDispatch } from "react-redux";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface StarRatingProps {
  onClickRate: (value: number) => void;
  onClickAuth: () => void;
}

interface RatingState {
  open: boolean;
  currentRating: number | null;
}

const filledColorClass = "text-orange-500";

const StarRating: React.FC<StarRatingProps> = ({
  onClickRate,
  onClickAuth,
}) => {
  const { toast } = useToast();

  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const [ratingState, setRatingState] = useState<RatingState>({
    open: false,
    currentRating: null,
  });

  const replaceFilledIcon = (toReplace: string, end: number) => {
    const stars: HTMLCollectionOf<SVGAElement> = document.getElementsByClassName(
      "stars"
    );

    const className = stars[0].getAttribute("class")?.split(" ");
    className[0] = toReplace;

    for (let i = 0; i < end + 1; i++) {
      stars.item(i)?.setAttribute("class", className?.join(" "));
    }
  };

  const handleOnClickRate = (value: number) => {
    if (ratingState.currentRating === value) {
      replaceFilledIcon("text-slate-50", 4);
      setRatingState({ open: false, currentRating: null });
      onClickRate(0);
    } else {
      setRatingState({ open: false, currentRating: value });
      replaceFilledIcon("text-slate-50", 4);
      replaceFilledIcon("text-orange-500", value);
    }
    onClickRate(value + 1);
  };

  return (
    <div className="flex justify-center space-x-1">
      <Toaster />
      {ratingState.open ? (
        <div className="flex justify-center space-x-1 animate-flyin">
          {Array(5)
            .fill(1)
            .map((_, value: number) => {
              return (
                <div
                  id="stars__container"
                  key={value}
                  className="cursor-pointer"
                >
                  <Button
                    variant="link"
                    onClick={() => handleOnClickRate(value)}
                    onMouseOver={() =>
                      replaceFilledIcon("text-orange-500", value)
                    }
                    onMouseLeave={() => {
                      if (ratingState.currentRating != null) {
                        replaceFilledIcon("text-slate-50", 4);
                        replaceFilledIcon(
                          filledColorClass,
                          ratingState.currentRating
                        );
                      } else {
                        replaceFilledIcon("text-slate-50", 4);
                      }
                    }}
                  >
                    <StarFilledIcon className="text-slate-50 size-6 stroke-orange-500 stars hover:text-orange-500" />
                  </Button>
                </div>
              );
            })}
        </div>
      ) : (
        <StarFilledIcon
          className="size-6 text-orange-500 drop-shadow-2xl cursor-pointer animate-flyin"
          onClick={() =>
            user
              ? setRatingState((prevState) => ({ ...prevState, open: true }))
              : toast({
                  title:
                    "поставить оценку могу только авторизованные пользователи",
                  action: <Button onClick={() => onClickAuth()}>войти</Button>,
                })
          }
        />
      )}
    </div>
  );
};

export default StarRating;
