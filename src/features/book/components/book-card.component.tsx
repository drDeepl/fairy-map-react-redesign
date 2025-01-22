import { Components } from "@/api/schemas/client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NotCoverBook from "@/components/not-cover-book.component";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface PreviewBookCardProps {
  book: Components.Schemas.StoryBookResponseDto;
}

interface InfoBookState {
  loadCover: boolean;
  book: Components.Schemas.StoryBookResponseDto;
}

export const PreviewBookCardComponent: React.FC<PreviewBookCardProps> = ({
  book,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [srcImg, setSrcImg] = useState<string>("true");

  const [infoBookState, setInfoBookState] = useState<InfoBookState>({
    loadCover: true,
    book: book,
  });

  useEffect(() => {
    console.log(srcImg);
    setInfoBookState((prevState) => ({
      ...prevState,
      loadCover: false,
    }));
  }, [srcImg]);

  useEffect(() => {
    if (book.srcImg) {
      axios
        .get(book.srcImg, {
          responseType: "blob",
        })
        .then((res) => {
          console.log(res);
          const imgUrl = URL.createObjectURL(res.data);
          setSrcImg(imgUrl);
        })
        .catch((error) => {
          setInfoBookState((prevState) => ({
            ...prevState,
            book: { ...prevState.book, srcImg: null },
          }));
          setSrcImg("");
        });
    } else {
      setInfoBookState((prevState) => ({
        ...prevState,
        loadCover: false,
      }));
    }
  }, []);

  return (
    <Card className="w-44 drop-shadow-xl drop-shadow-slate-300 h-72 rounded-xl">
      <CardContent className="flex flex-col m-0 p-0">
        <AspectRatio ratio={3 / 4} className="">
          {infoBookState.loadCover ? (
            <Skeleton className="size-full bg-neutral-300" />
          ) : (
            <div className="size-full">
              {!infoBookState.book.srcImg ? (
                <NotCoverBook />
              ) : (
                <img
                  ref={imgRef}
                  src={srcImg}
                  className="w-full h-full object-fill rounded-t-xl"
                  alt={infoBookState.book.name}
                />
              )}
            </div>
          )}
        </AspectRatio>
      </CardContent>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <CardFooter className="p-2  flex justify-center items-center">
            <TooltipTrigger asChild>
              <CardTitle className="line-clamp-2 ">
                {infoBookState.book.name}
              </CardTitle>
            </TooltipTrigger>
          </CardFooter>

          <TooltipContent side="bottom">
            <span>{infoBookState.book.name}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
};

export default PreviewBookCardComponent;
