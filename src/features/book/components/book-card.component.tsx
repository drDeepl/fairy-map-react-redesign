import { Components } from "@/api/schemas/client";
import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NotCoverBook from "@/components/not-cover-book.component";

interface PreviewBookCardProps {
  book: Components.Schemas.StoryBookResponseDto;
}

export const PreviewBookCardComponent: React.FC<PreviewBookCardProps> = ({
  book: story,
}) => {
  return (
    <Card className="w-44 drop-shadow-xl drop-shadow-slate-300 h-72 rounded-xl">
      <CardContent className="flex flex-col m-0 p-0">
        <AspectRatio ratio={3 / 4} className="">
          {!story.srcImg ? (
            <NotCoverBook />
          ) : (
            <img
              src={story.srcImg}
              className="w-full h-full object-fill rounded-t-xl"
              alt={story.name}
            />
          )}
        </AspectRatio>
      </CardContent>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <CardFooter className="p-2  flex justify-center items-center">
            <TooltipTrigger asChild>
              <CardTitle className="line-clamp-2 ">{story.name}</CardTitle>
            </TooltipTrigger>
          </CardFooter>

          <TooltipContent side="bottom">
            <span>{story.name}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
};

export default PreviewBookCardComponent;
