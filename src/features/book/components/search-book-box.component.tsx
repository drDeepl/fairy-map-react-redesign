import { Components } from "@/api/schemas/client";
import {
  Command,
  CommandEmpty,
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

interface SearchBookBoxProps {
  onClickBook: (
    books: Components.Schemas.StoryBookResponseDto
  ) => Promise<void>;
}
interface ListBookState {
  load: boolean;
  books: Components.Schemas.PageResponseDto<
    Components.Schemas.StoryBookResponseDto
  >;
}

const SearchBookBox: React.FC<SearchBookBoxProps> = ({ onClickBook }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [valueSearch, setValueSearch] = useState("");

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const handleStoryNameInput = (name: string) => {
    setValueSearch(name);
  };

  const handleStorySearch = () => {
    socket.emit("searchStoryByName", { name: valueSearch, take: 10 });
  };

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

    const onBookResults = (
      books: Components.Schemas.PageResponseDto<
        Components.Schemas.StoryBookResponseDto
      >
    ) => {
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
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                size="icon"
                className="rounded-full border border-baby-blue-500"
              >
                <MagnifyingGlassIcon />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>поиск книги по названию</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput
            onValueChange={(e) => handleStoryNameInput(e)}
            placeholder="введите название книги..."
            className="h-9"
          />
          <CommandList className="px-2">
            {isTyping ? null : <CommandEmpty>Книги не найдены.</CommandEmpty>}
            {isTyping ? (
              Array(3)
                .fill(1)
                .map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-5/6 h-4 bg-neutral-300 my-2 mx-4"
                  />
                ))
            ) : (
              <CommandGroup>
                {listBookState.books.data.map((book) => (
                  <CommandItem
                    className="cursor-pointer font-semibold text-center"
                    key={book.name}
                    value={book.name}
                    onSelect={() => onClickBook(book)}
                  >
                    {book.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBookBox;
