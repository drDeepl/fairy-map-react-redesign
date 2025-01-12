import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
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

import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import ReactAudioPlayer from "react-audio-player";
import { Skeleton } from "@/components/ui/skeleton";
import { CrossCircledIcon } from "@radix-ui/react-icons";

import apiClient from "@/api/apiClient";

import {
  ApplicationEditState,
  ApplicationEditData,
} from "../application/interfaces";
import { getDescriptionApplicationStatus } from "../application/helpers/get-description-application-status";

import DialogForm from "./components/alert-dialog-promt.component";
import ChangeApplicationStatusForm from "./forms/confirm-change-status/change-status.form";
import StatusDropdownMenu from "../application/components/status-dropdown.component";

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
    useState<ApplicationEditState>({
      data: undefined,
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
        showErrorToast("Ошибка при получении заявок...");
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

  const handleOnSelectStatus = (data: ApplicationEditData) => {
    setEditApplicationState({
      data,
    });
  };

  const columns = createColumns({
    onClickAudio: handleOnClickAudio,
  });

  const handleSubmitChangeStatusApplication = async (comment: string) => {
    try {
      if (editApplicationState.data) {
        const dto = {
          comment: editApplicationState.data.comment,
          status: editApplicationState.data.status,
        };
        if (comment.length > 0) {
          dto.comment = comment;
          handleOnSelectStatus({
            ...editApplicationState.data,
            comment: comment,
          });
        }

        const res = await apiClient.paths[
          "/api/audio-story-request/edit/{audioStoryReqeustId}"
        ].put(editApplicationState.data.aplicationId, dto);

        showSuccessToast("статус заявки успешно изменён");

        const updatedApplications =
          applicationTableState.paginationData.data.map((application) => {
            if (application.id === editApplicationState.data?.aplicationId) {
              application.status = editApplicationState.data?.status;
            }
            return application;
          });

        setApplicationTableState((prevState) => ({
          ...prevState,
          paginationData: {
            ...prevState.paginationData,
            data: updatedApplications,
          },
        }));
        setEditApplicationState({ data: undefined });
      }
    } catch (error: any) {
      const msg = error.response
        ? error.response.data.message
        : "ошибка при изменении статуса";
      showErrorToast(msg);
    }
  };

  const handleCancelChangeStatusApplication = async () => {
    setEditApplicationState({ data: undefined });
  };

  return (
    <div>
      <Toaster />
      <DialogForm
        open={editApplicationState.data != undefined}
        title={`Вы уверены, что хотите изменить статус озвучки на "${
          editApplicationState.data
            ? getDescriptionApplicationStatus(
                editApplicationState.data.status
              ).toLocaleUpperCase()
            : ""
        }" ?`}
        description="после подтверждения статус нельзя будет изменить"
      >
        <ChangeApplicationStatusForm
          onSubmit={handleSubmitChangeStatusApplication}
          onCancel={handleCancelChangeStatusApplication}
        />
      </DialogForm>
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
                      applicationTableState.paginationData.meta.hasPreviousPage
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      applicationTableState.paginationData.meta.hasPreviousPage
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
                      applicationTableState.paginationData.meta.hasPreviousPage
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
          <Drawer
            open={audioPlayerState.applicationAudio != null}
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
                    <div className="space-x-1">
                      <span>озвучил: </span>
                      <span>
                        {audioPlayerState.applicationAudio?.user.firstName}
                      </span>
                      <span>
                        {audioPlayerState.applicationAudio?.user.firstName}
                      </span>
                    </div>
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
                  {audioPlayerState.applicationAudio.status === "SEND" ? (
                    <StatusDropdownMenu
                      onSelectStatus={async (key: string) => {
                        if (audioPlayerState.applicationAudio) {
                          handleOnSelectStatus({
                            status: key,
                            aplicationId: audioPlayerState.applicationAudio.id,
                            comment: audioPlayerState.applicationAudio.comment,
                          });
                        }
                      }}
                      currentStatus={audioPlayerState.applicationAudio.status}
                    />
                  ) : null}

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
    </div>
  );
};

export default AdminRequestsPage;
