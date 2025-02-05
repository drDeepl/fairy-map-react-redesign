import { Components } from "@/api/schemas/client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { socket } from "@/api/sockets/sockets";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import NotCoverBook from "@/components/not-cover-book.component";
import { PageMetaDto } from "@/api/interfaces/page-meta.dto";

interface SearchBookBoxProps {
  onClickBook: (
    books: Components.Schemas.StoryBookResponseDto
  ) => Promise<void>;
}

interface BookPageResponse {
  data: Components.Schemas.StoryBookResponseDto[];
  meta: PageMetaDto;
}

interface ListBookState {
  load: boolean;
  books: BookPageResponse;
}

const SearchBookBox: React.FC<SearchBookBoxProps> = ({ onClickBook }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [valueSearch, setValueSearch] = useState("");

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const [listBookState, setListBookState] = useState<ListBookState>({
    load: false,
    books: {
      data: [],
      meta: {
        page: 1,
        take: 10,
        itemCount: 0,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    },
  });

  const handleOpenPopover = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setListBookState({
        load: false,
        books: {
          data: [],
          meta: {
            page: 1,
            take: 10,
            itemCount: 0,
            pageCount: 1,
            hasPreviousPage: false,
            hasNextPage: false,
          },
        },
      });
    }
  };

  const handleStoryNameInput = (name: string) => {
    setValueSearch(name);
  };

  const handleStorySearch = () => {
    socket.emit("searchStoryByName", { name: valueSearch, take: 10 });
  };

  useEffect(() => {
    if (valueSearch) {
      setIsTyping(true);
      // Установим тайм-аут на 1 секунду
      const timeoutId = setTimeout(() => {
        handleStorySearch();
      }, 500);

      // Очищаем тайм-аут, если пользователь продолжает печатать
      return () => clearTimeout(timeoutId);
    }
    setIsTyping(false);
  }, [valueSearch]);

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("disconnected");
      setIsConnected(false);
    };

    if (isConnected) {
      onConnect();
    }
    const onBookResults = (books: BookPageResponse) => {
      console.log("onBookResults");
      console.log(books);
      setListBookState({
        load: false,
        books: books,
      });
      setIsTyping(false);
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("searchResultStoryByName", onBookResults);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("searchResultStoryByName", onBookResults);
    };
  }, []);

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenPopover}>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  size="icon"
                  className="border rounded-full border-baby-blue-800 size-12"
                >
                  <MagnifyingGlassIcon className="text-slate-700" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>найти книгу</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent className="p-0 space-y-4 w-60" side="right">
          <Command>
            <CommandInput
              onValueChange={(e) => handleStoryNameInput(e)}
              placeholder="введите название книги..."
              className="relative h-9"
            />
            <Separator />
            <CommandList className="absolute top-8 right-[0.5px] rounded-[inherit] bg-white w-60">
              {isTyping ? (
                Array(3)
                  .fill(1)
                  .map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="w-5/6 h-4 mx-4 my-2 bg-neutral-300"
                    />
                  ))
              ) : (
                <CommandGroup>
                  {listBookState.books.data.map((book) => (
                    <CommandItem
                      className="font-semibold text-center cursor-pointer"
                      key={book.name}
                      value={book.name}
                      onSelect={() => {
                        onClickBook(book);
                        handleOpenPopover(false);
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="self-center size-8 ">
                          {book.srcImg ? (
                            <img src={book.srcImg} alt="" />
                          ) : (
                            <NotCoverBook />
                          )}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-start line-clamp-1">
                            {book.name}
                          </span>
                          <small className="lowercase text-slate-500">
                            {book.ethnicGroup.name}
                          </small>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBookBox;
