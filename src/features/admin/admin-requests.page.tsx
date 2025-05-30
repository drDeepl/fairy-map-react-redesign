import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Components } from "@/api/schemas/client";
import { createColumns } from "../application/components/data-table/columns";

import { DataTableApplicationAdmin } from "../application/components/data-table/data-table-application-admin.component";

import { Toaster } from "@/components/ui/toaster";

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

import PaginationBox from "@/components/pagination.component";
import { PageMetaDto } from "@/api/interfaces/page-meta.dto";

interface ApplicationTableState {
  load: boolean;
  paginationData: {
    data: Components.Schemas.AudioApplicationWithUserAudioResponseDto[];
    meta: PageMetaDto;
  };
}

const itemsPerPage = 10;

interface AudioPlayerState {
  applicationAudio: Components.Schemas.AudioApplicationWithUserAudioResponseDto | null;
}

interface AdminRequestsPageProps {
  setBottomPanelOpen: (open: boolean) => void;
}

const AdminRequestsPage: React.FC<AdminRequestsPageProps> = ({
  setBottomPanelOpen,
}) => {
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

  const [editApplicationState, setEditApplicationState] = useState<
    ApplicationEditState
  >({
    data: undefined,
  });

  const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
    applicationAudio: null,
  });

  const handleOnClickAudio = (
    application: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => {
    console.log(audioPlayerState);
    const audioPlayer: HTMLElement | null = document.getElementById(
      "audio-player__container"
    );
    console.log(application);

    setBottomPanelOpen(true);

    if (audioPlayer) {
      audioPlayer.classList.add("animate-in");
    }
    setAudioPlayerState({
      applicationAudio: application,
    });
  };

  // const handleOnClickCloseAudio = () => {
  //   const audioPlayer: HTMLElement | null = document.getElementById(
  //     "audio-player__container"
  //   );

  //   if (audioPlayer) {
  //     audioPlayer.classList.add("animate-zomm-out");
  //   }

  //   setAudioPlayerState({
  //     applicationAudio: null,
  //   });
  // };

  const showErrorToast = (msg: string) => {
    return toast({
      className: cn(
        "top-10 right-0 flex fixed w-1/3 border border-red-500 bg-red-50"
      ),
      action: (
        <div className="flex items-center w-full space-x-2">
          <CrossCircledIcon className="text-red-500 size-6" />
          <span className="text-sm font-semibold">{msg}</span>
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
        <div className="flex items-center w-full space-x-2 text-green-500">
          <CrossCircledIcon className="size-6 " />
          <span className="text-sm font-semibold">{msg}</span>
        </div>
      ),
    });
  };

  useEffect(() => {
    apiClient.paths["/api/audio-story-request/all"]
      .get({ take: itemsPerPage })
      .then((result: any) => {
        setApplicationTableState({
          load: false,
          paginationData: result.data,
        });
      })
      .catch((error: any) => {
        console.log(error);
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

  // const handleOnErrorAudio = (e: Event) => {
  //   console.log(e);
  //   showErrorToast("Ошибка при загрузки озвучки...");
  // };

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

        if (editApplicationState.data.status === "SUCCESSED") {
          const successedApplicaiton = applicationTableState.paginationData.data.find(
            (application) =>
              application.id === editApplicationState.data?.aplicationId
          );

          if (successedApplicaiton) {
            const data = {
              userAudioId: successedApplicaiton.userAudio.id,
              userId: successedApplicaiton.user.id,
              moderateScore: 0,
            };

            await apiClient.paths["/api/admin/story/{storyId}/audio"].post(
              {
                storyId: successedApplicaiton.storyId,
              },
              data
            );
          }
        }

        await apiClient.paths[
          "/api/audio-story-request/edit/{audioStoryReqeustId}"
        ].put(editApplicationState.data.aplicationId, dto);

        showSuccessToast("статус заявки успешно изменён");

        const updatedApplications = applicationTableState.paginationData.data.map(
          (application) => {
            if (application.id === editApplicationState.data?.aplicationId) {
              application.status = editApplicationState.data?.status;
            }
            return application;
          }
        );

        setApplicationTableState((prevState) => ({
          ...prevState,
          paginationData: {
            ...prevState.paginationData,
            data: updatedApplications,
          },
        }));
        setEditApplicationState({ data: undefined });
      }
    } catch (error) {
      console.log(error);
      const msg = "ошибка при изменении статуса";
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
      <div className="flex flex-col items-center p-3 space-y-2 shadow-md">
        {applicationTableState.paginationData.data.length > 0 ? (
          <PaginationBox
            meta={applicationTableState.paginationData.meta}
            onApplyPage={handleOnClickPage}
          />
        ) : null}

        <div className="animate-flip-in-y">
          {applicationTableState.load ? (
            <Skeleton
              className={`w-full h-80 m-2 ${
                applicationTableState.load
                  ? "animate-flip-in-y"
                  : "animate-zoom-out"
              }`}
            />
          ) : (
            <DataTableApplicationAdmin
              columns={columns}
              data={applicationTableState.paginationData.data}
            />
          )}
        </div>

        {/* {audioPlayerState.applicationAudio ? <NavbarComponent /> : null} */}
      </div>
    </div>
  );
};

export default AdminRequestsPage;
