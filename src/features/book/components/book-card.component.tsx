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

interface PreviewBookCardProps {
  book: Components.Schemas.StoryDto;
}

export const PreviewBookCardComponent: React.FC<PreviewBookCardProps> = ({
  book: story,
}) => {
  const [loadCover, setLoadCover] = useState<boolean>(true);

  return (
    <Card className="w-40 h-64">
      <CardContent className="flex flex-col m-0 p-2">
        <AspectRatio ratio={3 / 4} className="bg-muted">
          {loadCover ? <Skeleton className="w-full h-full" /> : null}
        </AspectRatio>
      </CardContent>
      <CardFooter className="px-2">
        <CardTitle className="">{story.name}</CardTitle>
      </CardFooter>
    </Card>
  );
};

export default PreviewBookCardComponent;
