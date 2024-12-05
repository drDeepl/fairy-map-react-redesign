import { Components } from "@/api/schemas/client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import NotCoverBook from "@/components/not-cover-book.component";

interface PreviewBookCardProps {
  book: Components.Schemas.StoryWithImgResponseDto;
}

export const PreviewBookCardComponent: React.FC<PreviewBookCardProps> = ({
  book: story,
}) => {
  const [loadCover, setLoadCover] = useState<boolean>(true);

  return (
    <Card className="w-40 drop-shadow-xl drop-shadow-slate-300 h-64 rounded-xl">
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
      <CardFooter className="p-2">
        <CardTitle className="">{story.name}</CardTitle>
      </CardFooter>
    </Card>
  );
};

export default PreviewBookCardComponent;
