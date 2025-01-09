import { Components } from "@/api/schemas/client";
import { createColumns } from "../application/components/data-table/columns";
import { DataTableApplicationAdmin } from "../application/components/data-table/data-table-application-admin.component";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import ReactAudioPlayer from "react-audio-player";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/api/apiClient";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Cross2Icon, CrossCircledIcon } from "@radix-ui/react-icons";

import { AxiosError } from "axios";

import {
  EditApplicationState,
  EditApplicationData,
} from "../application/interfaces";
import { getDescriptionApplicationStatus } from "../application/helpers/get-description-application-status";
import { ApplicationStatus } from "../application/constants/application-status.enum";

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

interface AudioPlayerState {
  applicationAudio: Components.Schemas.AudioApplicationWithUserAudioResponseDto | null;
}

interface SheetState {
  modal: boolean;
  side: "top" | "right" | "bottom" | "left";
}

const AdminRequestsPage = () => {
  const [sheetState, setSheetState] = useState<SheetState>({
    modal: true,
    side: "bottom",
  });

  const { toast } = useToast();

  const [applicationTableState, setApplicationTableState] = useState<
    ApplicationTableState
  >({
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

  const [
    editApplicationState,
    setEditApplicationState,
  ] = useState<EditApplicationState | null>(null);

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

  const showToast = (msg: string) => {
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

  useEffect(() => {
    apiClient.paths["/api/audio-story-request/all"]
      .get({ take: itemsPerPage })
      .then((result) => {
        setApplicationTableState({
          load: false,
          paginationData: result.data,
        });
      })
      .catch((error: AxiosError) => {
        showToast("Ошибка при загрузки озвучки...");
      });
  }, []);

  const handleOnClickPage = async (page: number) => {
    try {
      if (page === applicationTableState.paginationData.meta.page) {
        return;
      }
      setApplicationTableState((prevState) => ({ ...prevState, load: true }));
      const res = await apiClient.paths["/api/audio-story-request/all"].get({
        take: itemsPerPage,
        page: page,
      });

      setApplicationTableState({
        load: false,
        paginationData: res.data,
      });
    } catch (error) {
      setApplicationTableState((prevState) => ({
        ...prevState,
        load: false,
      }));
      showToast("Произошла ошибка при получении заявок");
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
    showToast("Ошибка при загрузки озвучки...");
  };

  const handleOnSelectStatus = (data: EditApplicationData) => {
    setEditApplicationState({
      data,
    });

    setSheetState((prevState) => ({ ...prevState, side: "top" }));
  };

  const columns = createColumns({
    onClickAudio: handleOnClickAudio,
    onSelectStatus: handleOnSelectStatus,
  });

  return (
    <div>
      <Sheet
        modal={sheetState.modal}
        open={false}
        onOpenChange={(open) => {
          if (!open) {
            setAudioPlayerState({
              applicationAudio: null,
            });
          }
        }}
      >
        <Toaster />
        <div className="flex flex-col p-3 space-y-2">
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
                {applicationTableState.paginationData.meta.hasPreviousPage ? (
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
                              applicationTableState.paginationData.meta.page - 1
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
                                applicationTableState.paginationData.meta.page
                              }
                              onClick={() => handleOnClickPage(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })
                  : Array(applicationTableState.paginationData.meta.pageCount)
                      .fill(1)
                      .map((_, index) => {
                        return (
                          <PaginationItem key={index}>
                            <PaginationLink
                              className="cursor-pointer"
                              isActive={
                                index + 1 ===
                                applicationTableState.paginationData.meta.page
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
                              applicationTableState.paginationData.meta.page + 1
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
          {audioPlayerState.applicationAudio ? (
            // className="sticky left-[30lvw] right-[30lvw] bottom-[5lvh] w-[40lvw] shadow-ghost"
            <Drawer
              open={audioPlayerState.applicationAudio != null}
              dismissible={false}
              modal={false}
            >
              <DrawerContent className="flex items-center justify-content-center w-1/3 pb-6">
                <DrawerHeader className="flex">
                  <DrawerTitle className="flex items-center justify-between">
                    <span>{audioPlayerState.applicationAudio?.storyName}</span>
                    <Button
                      size="icon"
                      variant="link"
                      onClick={handleOnClickCloseAudio}
                    >
                      <Cross2Icon />
                    </Button>
                  </DrawerTitle>
                  <DrawerDescription className="">
                    <div className="space-x-2">
                      <span>озвучил: </span>
                      <span>
                        {audioPlayerState.applicationAudio?.user.firstName}
                      </span>
                      <span>
                        {audioPlayerState.applicationAudio?.user.firstName}
                      </span>
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
                <div className="w-56">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="font-semibold" asChild>
                      <Button>
                        {getDescriptionApplicationStatus(
                          audioPlayerState.applicationAudio.status
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.keys(ApplicationStatus).map((key) => (
                        <DropdownMenuItem
                          key={key}
                          className="font-semibold"
                          onClick={() =>
                            audioPlayerState.applicationAudio
                              ? handleOnSelectStatus({
                                  value: getDescriptionApplicationStatus(key),
                                  aplicationId:
                                    audioPlayerState.applicationAudio.id,
                                  comment:
                                    audioPlayerState.applicationAudio.comment,
                                })
                              : null
                          }
                        >
                          {getDescriptionApplicationStatus(key)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </DrawerContent>
            </Drawer>
          ) : null}
        </div>

        <SheetContent side={sheetState.side} className="mx-4 rounded-xl">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminRequestsPage;
