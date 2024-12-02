import { Components } from "@/api/schemas/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleHelp } from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

interface PreviewBookCardProps {
  book: Components.Schemas.StoryWithImgResponseDto;
}

export const PreviewBookCardComponent: React.FC<PreviewBookCardProps> = ({
  book: story,
}) => {
  const [loadCover, setLoadCover] = useState<boolean>(true);
  console.log(story);

  return (
    <Card className="w-40 drop-shadow-xl drop-shadow-slate-300 h-64 rounded-xl">
      <CardContent className="flex flex-col m-0 p-0">
        <AspectRatio ratio={3 / 4} className="">
          {!story.srcImg ? (
            <div className="flex items-center justify-center bg-slate-200 size-full rounded-t-xl">
              {/* <CircleHelp className="size-28 stroke-zinc-400 stroke-1 self-center" /> */}
              {/* <span className="text-5xl text-zinc-700">?</span> */}
              <QuestionMarkIcon className="size-14 text-zinc-600 opacity-60" />
            </div>
          ) : (
            <img
              src={story.srcImg}
              className="w-full h-full object-fill rounded-t-xl"
              alt={story.name}
            />
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="p-2">
        <CardTitle className="">{story.name}</CardTitle>
      </CardFooter>
    </Card>
  );
};

export default PreviewBookCardComponent;
