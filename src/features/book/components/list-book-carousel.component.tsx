import { Card } from "@/components/ui/card";
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
import { useMediaQuery } from "react-responsive";

interface ListBookCarouselProps {
  books: Components.Schemas.StoryBookResponseDto[];
  load: boolean;
  onClickBook: (book: Components.Schemas.StoryBookResponseDto) => void;
  children?: React.ReactNode;
}

const ListBookCarousel: React.FC<ListBookCarouselProps> = ({
  load,
  books,
  onClickBook,
  children,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleOnClickBook = (book: Components.Schemas.StoryBookResponseDto) => {
    onClickBook(book);
  };

  return (
    <div
      className={`items-center my-4 shadow bg-neutral-50 rounded-xl mx-14 ${
        isMobile ? "flex flex-col items-center" : ""
      }`}
    >
      {books.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            skipSnaps: true,
            containScroll: "trimSnaps",
            slidesToScroll: 3,
          }}
          className={`flex flex-col justify-center ${isMobile ? "w-56" : ""}`}
        >
          <div className="flex flex-col self-center my-6">
            <div className="px-4">{children}</div>
            <CarouselNext className="border border-zinc-600 lg:size-12" />
            <CarouselPrevious className="border border-zinc-600 lg:size-12" />
          </div>
          <CarouselContent className="px-4">
            {load
              ? Array.from({ length: 5 }).map((_, idx) => {
                  return (
                    <CarouselItem
                      key={`load_${idx}`}
                      className="pl-1 w-44 h-72 lg:basis-1/5 md:basis-1/3"
                    >
                      <Card className="w-44 h-72 p-2 m-0 border-none">
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
                      className="my-4 w-44 h-72 cursor-pointer sm:basis-1/5"
                    >
                      <PreviewBookCardComponent book={book} />
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="text-slate-600 text-xl flex flex-col justify-center items-center py-12">
          <span>Книги не найдены</span>
        </div>
      )}
    </div>
  );
};

export default ListBookCarousel;
