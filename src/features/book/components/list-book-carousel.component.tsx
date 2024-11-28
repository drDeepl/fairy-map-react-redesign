import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import PreviewBookCardComponent from "./book-card.component";
import React from "react";
import { Components } from "@/api/schemas/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ListBookCarouselProps {
  books: Components.Schemas.StoryDto[];
  load: boolean;
}

const ListBookCarousel: React.FC<ListBookCarouselProps> = ({ load, books }) => {
  return (
    <div className="flex justify-center my-8">
      <Carousel
        opts={{
          align: "start",
        }}
        className="md:w-full md:max-w-md lg:max-w-4xl"
      >
        <CarouselContent className="">
          {load
            ? Array.from({ length: 5 }).map((_, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="my-4 mx-6 md:basis-1/3 lg:basis-1/5 w-40 h-64"
                  >
                    <Card className="w-40 h-64 p-0 m-0 border-none">
                      {/* <AspectRatio className=""></AspectRatio> */}
                      <Skeleton className="w-full h-full bg-primary/10" />
                    </Card>
                  </CarouselItem>
                );
              })
            : books.map((book) => {
                return (
                  <CarouselItem
                    key={book.id}
                    className="my-4 mx-6 md:basis-1/3 lg:basis-1/5 w-40 h-64"
                  >
                    <PreviewBookCardComponent book={book} />
                  </CarouselItem>
                );
              })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default ListBookCarousel;
