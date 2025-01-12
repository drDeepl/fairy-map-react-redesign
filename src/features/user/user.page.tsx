import React, { useEffect, useRef, useState } from "react";
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
import { AxiosError, AxiosResponse } from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RouteApp } from "@/pages/constants/route.enum";
import {
  CrossCircledIcon,
  ExitFullScreenIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { DataTableApplicationAdmin } from "../application/components/data-table/data-table-application-admin.component";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MapPinnedIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { createColumns } from "./components/data-table/columns";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import ReactAudioPlayer from "react-audio-player";

import { useToast } from "@/hooks/use-toast";

interface UserBookAudioState {
  load: boolean;
  books: Components.Schemas.StoryWithImgResponseDto[];
}

interface AudioPlayerState {
  applicationAudio: Components.Schemas.AudioApplicationWithUserAudioResponseDto | null;
}

interface ApplicationTableState {
  load: boolean;
  paginationData: {
    data: Components.Schemas.AudioApplicationWithUserAudioResponseDto[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}

const itemsPerPage = 10;

const UserPage: React.FC = () => {
  const { user }: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { toast } = useToast();

  const [load, setLoad] = useState<boolean>(true);

  const [userAudioStoriesState, setUserAudioStoriesState] =
    useState<UserBookAudioState>({
      load: true,
      books: [],
    });

  const [applicationTableState, setApplicationTableState] =
    useState<ApplicationTableState>({
      load: true,
      paginationData: {
        data: [],
        meta: {
          page: 0,
          take: 0,
          itemCount: 0,
          pageCount: 0,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      },
    });
  const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
    applicationAudio: null,
  });

  const pageInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnClickAudio = (
    application: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => {
    const audioPlayer: HTMLElement | null = document.getElementById(
      "audio-player__container"
    );

    if (audioPlayer) {
      audioPlayer.classList.add("animate-in");
    }
    setAudioPlayerState({
      applicationAudio: application,
    });
  };

  const handleOnClickCloseAudio = () => {
    const audioPlayer: HTMLElement | null = document.getElementById(
      "audio-player__container"
    );

    if (audioPlayer) {
      audioPlayer.classList.add("animate-zomm-out");
    }

    setAudioPlayerState({
      applicationAudio: null,
    });
  };

  const showErrorToast = (msg: string) => {
    return toast({
      className: cn(
        "top-10 right-0 flex fixed w-1/3 border border-red-500 bg-red-50"
      ),
      action: (
        <div className="flex items-center space-x-2 w-full">
          <CrossCircledIcon className="size-6 text-red-500" />
          <span className="font-semibold text-sm">{msg}</span>
        </div>
      ),
    });
  };

  const showSuccessToast = (msg: string) => {
    return toast({
      className: cn(
        "top-10 w-[30vw] left-[35lvw] right-[35lvw] flex fixed border border-green-500 bg-green-50"
      ),
      action: (
        <div className="flex items-center space-x-2 w-full text-green-500">
          <CrossCircledIcon className="size-6 " />
          <span className="font-semibold text-sm">{msg}</span>
        </div>
      ),
    });
  };

  const handleOnClickPage = async (page: number) => {
    try {
      if (page === applicationTableState.paginationData.meta.page) {
        return;
      }
      setApplicationTableState((prevState) => ({ ...prevState, load: true }));
      const res = await apiClient.paths["/api/user/story/audio/request/my"].get(
        {
          take: itemsPerPage,
          page: page,
        }
      );

      setApplicationTableState({
        load: false,
        paginationData: res.data,
      });
    } catch (error) {
      setApplicationTableState((prevState) => ({
        ...prevState,
        load: false,
      }));
      showErrorToast("Произошла ошибка при получении заявок");
    }
  };

  const handleOnApplyInputPage = async () => {
    if (pageInputRef.current) {
      if (pageInputRef.current.value.length === 0) {
        return;
      }
      const page = Number(pageInputRef.current.value.replace("-", ""));
      if (page <= applicationTableState.paginationData.meta.pageCount) {
        await handleOnClickPage(Number(pageInputRef.current.value));
      }
      pageInputRef.current.value = "";
    }
  };

  const handleOnErrorAudio = (e: Event) => {
    console.log(e);
    showErrorToast("Ошибка при загрузки озвучки...");
  };

  useEffect(() => {
    if (!user) {
      navigate(-1);
    } else {
      console.error("todo: fetch StoryWithImgResponseDto by authorId");
      apiClient.paths["/api/user/story/audio/request/my"]
        .get({ take: itemsPerPage })
        .then((result) => {
          setApplicationTableState({
            load: false,
            paginationData: result.data,
          });
        })
        .catch((error: AxiosError) => {
          showErrorToast("Ошибка при получении заявок...");
        });
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

  const columns = createColumns({
    onClickAudio: handleOnClickAudio,
  });

  const handleOnClickLogout = () => {
    dispatch(userLogOut());
    navigate(RouteApp.MapPage);
  };

  if (load) {
    return <LoadSpinner />;
  }

  return (
    <div className="flex flex-col justify-center">
      <Toaster />
      <div className="sticky w-full flex justify-between items-center px-4 py-4 pl-20 shadow-md rounded-md">
        <p className="text-black font-semibold text-xl capitalize">
          Привет, {user?.firstName}!👋
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="audio-stories">
            <AccordionTrigger className="text-lg">
              Книги с моей озвучкой
            </AccordionTrigger>
            <AccordionContent className="p-0"></AccordionContent>
          </AccordionItem>
          <AccordionItem value="requests-audio-story">
            <AccordionTrigger className="text-lg">
              Мои заявки на озвучку
            </AccordionTrigger>
            <AccordionContent>
              {applicationTableState.load ? (
                <Skeleton className="w-full h-80 m-2" />
              ) : (
                <DataTableApplicationAdmin
                  columns={columns}
                  data={applicationTableState.paginationData.data}
                />
              )}

              {applicationTableState.paginationData.data.length > 0 ? (
                <Pagination>
                  <PaginationContent>
                    {applicationTableState.paginationData.meta
                      .hasPreviousPage ? (
                      <PaginationItem>
                        <PaginationPrevious
                          isActive={
                            applicationTableState.paginationData.meta
                              .hasPreviousPage
                          }
                          className="cursor-pointer"
                          onClick={() =>
                            applicationTableState.paginationData.meta
                              .hasPreviousPage
                              ? handleOnClickPage(
                                  applicationTableState.paginationData.meta
                                    .page - 1
                                )
                              : null
                          }
                        />
                      </PaginationItem>
                    ) : null}
                    {applicationTableState.paginationData.meta.pageCount > 5
                      ? Array(5)
                          .fill(1)
                          .map((_, index) => {
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  className="cursor-pointer"
                                  isActive={
                                    index + 1 ===
                                    applicationTableState.paginationData.meta
                                      .page
                                  }
                                  onClick={() => handleOnClickPage(index + 1)}
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })
                      : Array(
                          applicationTableState.paginationData.meta.pageCount
                        )
                          .fill(1)
                          .map((_, index) => {
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  className="cursor-pointer"
                                  isActive={
                                    index + 1 ===
                                    applicationTableState.paginationData.meta
                                      .page
                                  }
                                  onClick={() => handleOnClickPage(index + 1)}
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}

                    {applicationTableState.paginationData.meta.hasNextPage ? (
                      <PaginationItem>
                        <PaginationNext
                          className="cursor-pointer"
                          onClick={() =>
                            applicationTableState.paginationData.meta
                              .hasPreviousPage
                              ? handleOnClickPage(
                                  applicationTableState.paginationData.meta
                                    .page + 1
                                )
                              : null
                          }
                        />
                      </PaginationItem>
                    ) : null}
                    <PaginationItem className="flex items-center space-x-2">
                      <Input
                        ref={pageInputRef}
                        type="number"
                        min={0}
                        className="w-10 text-center"
                        placeholder={`${applicationTableState.paginationData.meta.page}`}
                      />
                      <span>из</span>
                      <span>
                        {applicationTableState.paginationData.meta.pageCount}
                      </span>
                      <Button
                        variant="secondary"
                        onClick={() => handleOnApplyInputPage()}
                      >
                        перейти
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {audioPlayerState.applicationAudio ? (
        <Drawer
          open={audioPlayerState.applicationAudio != null}
          modal={false}
          dismissible={false}
          handleOnly={true}
        >
          <DrawerContent className="flex items-center w-[50vw] left-[25lvw] right-[25lvw] px-4">
            <DrawerHeader className="pt-0">
              <DrawerTitle className="text-center text-xl">
                <span>
                  {audioPlayerState.applicationAudio?.userAudio.originalName}
                </span>
              </DrawerTitle>
              <DrawerDescription className="text-md">
                <div className="flex flex-col items-center ">
                  <span>{audioPlayerState.applicationAudio?.storyName}</span>
                </div>
              </DrawerDescription>
            </DrawerHeader>

            <ReactAudioPlayer
              className="w-full"
              controls
              controlsList="nodownload noplaybackrate foobar"
              src={audioPlayerState.applicationAudio?.userAudio.srcAudio}
              onError={handleOnErrorAudio}
            />

            <DrawerFooter className="flex justify-between text-slate-800">
              <div className="flex items-center justify-items-center w-full space-x-4">
                <Button
                  variant="outline"
                  onClick={handleOnClickCloseAudio}
                  className="bg-slate-100"
                >
                  закрыть
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </div>
  );
};

export default UserPage;
