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
import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";
import { AxiosResponse } from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RouteApp } from "@/pages/constants/route.enum";
import { ExitFullScreenIcon, ExitIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPinnedIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserBookAudioState {
  load: boolean;
  books: Components.Schemas.StoryWithImgResponseDto[];
}

const UserPage: React.FC = () => {
  const { user }: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  const [userAudioStoriesState, setUserAudioStoriesState] =
    useState<UserBookAudioState>({
      load: true,
      books: [],
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
        .then(
          (
            res: AxiosResponse<Components.Schemas.StoryWithImgResponseDto[]>
          ) => {
            setUserAudioStoriesState({
              load: false,
              books: res.data,
            });
            console.log(userAudioStoriesState);
          }
        );
    }
  }, []);

  const handleOnClickAvatar = () => {
    console.error("on click avatar");
  };

  // const handleOnClickBook = (book: StoryWithImgResponseDto) => {
  //   setSelectedBookViewState({ book });
  // };

  // const handleOnCloseBook = () => {
  //   setSelectedBookViewState({ book: null });
  // };

  const handleOnClickLogout = () => {
    dispatch(userLogOut());
    navigate(RouteApp.MapPage);
  };

  if (load) {
    return <LoadSpinner />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="sticky w-full flex justify-between items-center px-4 py-4 pl-20 shadow-md rounded-md">
        {/* <Button
          variant="ghost"
          size="icon"
          className="size-11 rounded-full border border-slate-800 bg-slate-100"
          onClick={handleOnClickLogout}
        >
          <ExitIcon />
        </Button> */}
        <p className="text-black font-semibold text-xl capitalize">
          Привет, {user?.firstName}
        </p>

        <div className="space-x-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full text-slate-600 border border-baby-blue-800 bg-baby-blue-50 size-11 shadow-md"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(RouteApp.MapPage)}
                >
                  <MapPinnedIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>к карте</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full text-slate-600 border border-baby-blue-800 bg-baby-blue-50 size-11 shadow-md"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOnClickLogout()}
                >
                  {/* <span className="text-black text-xl">
            {user?.firstName[0].toUpperCase()}
          </span> */}
                  <ExitIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>выйти</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
      {/* {selectedBookViewState.book ? (
        <BookInfoCardComponent
          book={selectedBookViewState.book}
          onClose={handleOnCloseBook}

        />
      ) : null} */}
    </div>
  );
};

export default UserPage;
