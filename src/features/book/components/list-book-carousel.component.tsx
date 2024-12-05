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
import BookInfoCardComponent from "./book-info-card.component";

interface ListBookCarouselProps {
  books: Components.Schemas.StoryWithImgResponseDto[];
  load: boolean;
  onClickBook: (book: Components.Schemas.StoryWithImgResponseDto) => void;
  children?: React.ReactNode;
}

const ListBookCarousel: React.FC<ListBookCarouselProps> = ({
  load,
  books,
  onClickBook,
  children,
}) => {
  const handleOnClickBook = (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    console.log("on click book", book);
    onClickBook(book);
  };
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="flex flex-col justify-center"
      >
        <div className="relative self-center my-6">
          {children}
          <CarouselNext className="border border-zinc-600" />
          <CarouselPrevious className="border border-zinc-600" />
        </div>
        <CarouselContent className="px-2">
          {load
            ? Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <CarouselItem
                    key={`load_${idx}`}
                    className="pl-1 w-40 h-64 lg:basis-1/5 md:basis-1/3"
                  >
                    <Card className="w-40 h-64 p-0 m-0 border-none">
                      <Skeleton className="w-full h-full bg-primary/10" />
                    </Card>
                  </CarouselItem>
                );
              })
            : books.map((book) => {
                return (
                  <CarouselItem
                    key={book.id}
                    onClick={() => handleOnClickBook(book)}
                    className="basis-1/5 my-4 w-40 h-64 cursor-pointer"
                  >
                    <PreviewBookCardComponent book={book} />
                  </CarouselItem>
                );
              })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ListBookCarousel;
