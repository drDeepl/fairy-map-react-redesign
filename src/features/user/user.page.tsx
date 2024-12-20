import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { AuthState, userLogOut } from "../auth/auth.slice";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListBookCarousel from "../book/components/list-book-carousel.component";
import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";
import { AxiosResponse } from "axios";
import BookInfoCardComponent from "../book/components/book-info-card.component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RouteApp } from "@/pages/constants/route.enum";

interface StoryWithImgResponseDto
  extends Components.Schemas.StoryWithImgResponseDto {}

interface UserBookAudioState {
  load: boolean;
  books: StoryWithImgResponseDto[];
}

interface SelectedBookViewState {
  book: StoryWithImgResponseDto | null;
}

const UserPage: React.FC = () => {
  const { user }: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  const [userAudioStoriesState, setUserAudioStoriesState] = useState<
    UserBookAudioState
  >({
    load: true,
    books: [],
  });

  const [selectedBookViewState, setSelectedBookViewState] = useState<
    SelectedBookViewState
  >({
    book: null,
  });

  useEffect(() => {
    if (!user) {
      navigate(-1);
    } else {
      console.error("todo: fetch StoryWithImgResponseDto by authorId");
      console.error("todo: fetch requests by userId");
      setLoad(false);
      apiClient.paths["/api/story/audio/user/{userId}"]
        .get({
          userId: Number(user.sub),
        })
        .then((res: AxiosResponse<StoryWithImgResponseDto[]>) => {
          setUserAudioStoriesState({
            load: false,
            books: res.data,
          });
        });
    }
  }, []);

  const handleOnClickAvatar = () => {
    console.error("on click avatar");
  };

  const handleOnClickBook = (book: StoryWithImgResponseDto) => {
    setSelectedBookViewState({ book });
  };

  const handleOnCloseBook = () => {
    setSelectedBookViewState({ book: null });
  };

  const handleOnClickLogout = () => {
    dispatch(userLogOut());
    navigate(RouteApp.MapPage);
  };

  if (load) {
    return <LoadSpinner />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full flex justify-end px-4 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-slate-800 bg-slate-100 size-11 shadow-md"
              variant="ghost"
              size="icon"
              onClick={() => handleOnClickAvatar()}
            >
              <span className="text-black">
                {user?.firstName[0].toUpperCase()}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleOnClickLogout}
            >
              выйти
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-24 py-4">
        <div>Книги с моей озвучкой</div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="audio-stories">
            <AccordionTrigger>Книги с моей озвучкой</AccordionTrigger>
            <AccordionContent className="p-0"></AccordionContent>
          </AccordionItem>
          <AccordionItem value="requests-audio-story">
            <AccordionTrigger>Заявки на озвучку</AccordionTrigger>
            <AccordionContent>
              Тут будут файлы с заявкой на озвучку
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {selectedBookViewState.book ? (
        <BookInfoCardComponent
          book={selectedBookViewState.book}
          onClose={handleOnCloseBook}
        />
      ) : null}
    </div>
  );
};

export default UserPage;
