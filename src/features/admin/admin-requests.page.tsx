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
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/api/apiClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";

import ReactAudioPlayer from "react-audio-player";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  EditApplicationState,
  EditApplicationData,
} from "../application/interfaces";

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

const AdminRequestsPage = () => {
  const { toast } = useToast();

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

  const [editApplicationState, setEditApplicationState] =
    useState<EditApplicationState | null>(null);

  const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
    applicationAudio: null,
  });

  const pageInputRef = useRef<HTMLInputElement | null>(null);
  const handleOnClickAudio = (
    application: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => {
    setAudioPlayerState({
      applicationAudio: application,
    });
  };

  const showToast = (msg: string) => {
    return toast({
      className: cn(
        "top-8 right-[22%] flex fixed w-1/3 border border-red-500 bg-red-50"
      ),
      action: (
        <div className="flex items-center space-x-2 w-full">
          <CrossCircledIcon className="size-6 text-red-500" />
          <span className="font-semibold text-md">{msg}</span>
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
        showToast("Что-то пошло не так...");
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
      showToast("Что-то пошло не так...");
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
    showToast("что-то пошло не так");
  };

  const handleOnSelectStatus = (data: EditApplicationData) => {
    setEditApplicationState({
      data,
    });
  };

  const columns = createColumns({
    onClickAudio: handleOnClickAudio,
    onSelectStatus: handleOnSelectStatus,
  });

  return (
    <div>
      <Sheet
        open={audioPlayerState.applicationAudio ? true : false}
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
                          <PaginationItem>
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
        </div>

        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>
              <span>{audioPlayerState.applicationAudio?.user.firstName}</span>{" "}
              <span>{audioPlayerState.applicationAudio?.user.firstName}</span>
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <ReactAudioPlayer
            className="w-full"
            controls
            controlsList="nodownload noplaybackrate foobar"
            src={audioPlayerState.applicationAudio?.userAudio.srcAudio}
            onError={handleOnErrorAudio}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminRequestsPage;
