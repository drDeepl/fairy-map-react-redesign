import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import NotCoverBook from "@/components/not-cover-book.component";
import { useEffect, useState } from "react";

import { DotsHorizontalIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CoverUploadDto } from "../interfaces/cover-upload.dto";
import ListAudios from "./audio-book/list-audios.component";

import { Skeleton } from "@/components/ui/skeleton";
import AudioPlayer, { InterfacePlacement } from "react-modern-audio-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadSpinner from "@/components/ui/load-spinner";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

interface BookInfoCardProps {
  book: Components.Schemas.StoryWithImgResponseDto;
  onClose: () => void;
  onUploadCover?: (
    dto: CoverUploadDto
  ) => Promise<Components.Schemas.StoryWithImgResponseDto>;
  children?: React.ReactNode;
}

interface TextAction {
  show: boolean;
  fullScreen: boolean;
}

interface InfoBookState {
  loadCover: boolean;
  loadText: boolean;
  book: Components.Schemas.StoryWithImgResponseDto;
  text: string | null;
}

interface AudioState {
  isPlaying: boolean;
  load: boolean;
  audio: Components.Schemas.AudioStoryResponseDto | null;
}

interface AudioListState {
  load: boolean;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  book,
  onClose,
  onUploadCover,
  children,
}) => {
  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
  });

  const [audiosListState, setAudioListState] = useState<AudioListState>({
    load: true,
    audios: [],
  });
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    audio: null,
    load: false,
  });

  const [infoBookState, setInfoBookState] = useState<InfoBookState>({
    loadCover: false,
    loadText: false,
    book: book,
    text: null,
  });

  const handleAxiosError = (error: AxiosError) => {
    const msg =
      error.code === "ERR_NETWORK" ? error.code : "что-то пошло не так";
    toast.error(msg);
  };

  useEffect(() => {
    setInfoBookState((prevState) => ({ ...prevState, loadText: true }));
    apiClient
      .StoryController_getTextStoryByStoryId(book.id)
      .then((result) => {
        console.log(result.data);
        const text = result.data.text
          ? result.data.text
          : "текст сказки не найден";
        setInfoBookState((prevState) => ({
          ...prevState,
          text: text,
          loadText: false,
        }));
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });

    apiClient
      .StoryController_getAudiosByStoryId(book.id)
      .then(
        (result: AxiosResponse<Components.Schemas.AudioStoryResponseDto[]>) => {
          setAudioListState({
            load: false,
            audios: result.data,
          });
        }
      )
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  }, []);

  const handleShowText = (showText: boolean) => {
    setTextAction({ show: showText, fullScreen: false });
  };

  const handleFullScreen = (fullScreen: boolean) => {
    setTextAction((prevState) => ({ ...prevState, fullScreen: fullScreen }));
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInfoBookState((prevState) => ({ ...prevState, loadCover: true }));
    if (onUploadCover) {
      if (event.target.files && event.target.files.length > 0) {
        const updatedBook = await onUploadCover({
          storyId: book.id,
          img: event.target.files[0],
        });

        setInfoBookState((prevState) => ({
          ...prevState,
          loadCover: false,
          book: updatedBook,
        }));
      }
    }
  };

  const handleOnSelectAudio = async (
    audio: Components.Schemas.AudioStoryResponseDto
  ) => {
    setAudioState((prevState) => ({ ...prevState, load: false, audio: audio }));
  };

  const [openDialog, setOpenDialog] = useState<boolean>(true);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setOpenDialog(open);
        }
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          {textAction.fullScreen ? null : (
            <div className="w-full flex my-4 animate-out gap-4">
              <div className="w-44 h-56 flex justify-items-center justify-center">
                {infoBookState.loadCover ? (
                  <div>
                    <LoadSpinner />
                  </div>
                ) : (
                  <Label
                    htmlFor="picture"
                    className={`${onUploadCover ? "cursor-pointer" : ""}`}
                  >
                    {infoBookState.book.srcImg ? (
                      <img
                        src={infoBookState.book.srcImg}
                        alt={infoBookState.book.name}
                        className="rounded-t-xl w-44 h-56 object-cover"
                      />
                    ) : (
                      <div className="size-full">
                        <NotCoverBook />
                      </div>
                    )}
                  </Label>
                )}

                {onUploadCover ? (
                  <Input
                    className="hidden"
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFile}
                  />
                ) : null}
              </div>

              <div className="w-2/3">
                <DialogTitle>
                  <div className="flex space-x-2">
                    <span>{infoBookState.book.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DotsHorizontalIcon className="size-5 self-center cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>{children}</DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {infoBookState.book.ethnicGroup.name}
                </DialogDescription>

                {audiosListState.load ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <ListAudios
                    audios={audiosListState.audios}
                    onSelectAudio={handleOnSelectAudio}
                  />
                )}
                <div className="flex w-full pt-2">
                  {audioState.audio && !audioState.load ? (
                    <AudioPlayer
                      playList={[{ id: 1, src: audioState.audio?.srcAudio }]}
                      activeUI={{
                        playButton: true,
                        progress: "bar",
                        volume: true,
                        volumeSlider: true,
                        trackTime: true,
                      }}
                      placement={{
                        interface: {
                          templateArea: {
                            trackTimeDuration: "row1-6",
                            progress: "row1-4",
                            playButton: "row1-1",
                            volume: "row2-1",
                          },
                        } as InterfacePlacement,
                      }}
                    />
                  ) : null}
                  {audioState.load ? (
                    <Skeleton className="w-full h-10 mt-2" />
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="-mt-11">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="story-text">
              <AccordionTrigger
                className="text-base outline-none justify-start space-x-2"
                onClick={() => {
                  handleShowText(!textAction.show);
                }}
              >
                <div className="flex justify-between">
                  <span className="animate-in text-md">
                    {!textAction.show ? "показать текст" : "скрыть текст"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="max-h-72 rounded-md border overflow-auto">
                {infoBookState.loadText ? (
                  <LoadSpinner />
                ) : (
                  <div className="text-base">
                    <p className="row-span-1 flex justify-center">
                      {infoBookState.text}
                    </p>
                    <div className="fixed -right-[5rem] bottom-7 w-1/3">
                      <Button
                        variant="secondary"
                        className="size-8 animate-out border border-slate-800"
                        onClick={() => {
                          handleFullScreen(!textAction.fullScreen);
                        }}
                      >
                        <EnterFullScreenIcon className=" text-slate-800" />
                      </Button>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookInfoCardComponent;
