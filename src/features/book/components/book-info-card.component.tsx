import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
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

import {
  CaretDownIcon,
  Cross1Icon,
  EnterFullScreenIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CoverUploadDto } from "../interfaces/cover-upload.dto";

import { Skeleton } from "@/components/ui/skeleton";

import LoadSpinner from "@/components/ui/load-spinner";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
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

import AudioBookPlayer from "@/features/audio-book/audio-book-player.component";
import AudioBookPlaylist from "@/features/audio-book/components/audio-book-playlist.component";
import { LanguagesIcon } from "lucide-react";
import StarRating from "@/components/rating.component";
import { AlertDialogPortal } from "@/components/ui/alert-dialog";

interface BookInfoCardProps {
  book: Components.Schemas.StoryWithImgResponseDto;
  onClose: () => void;
  onClickRate: (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined>;
  onClickAuth: () => void;
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

interface ListAudiosState {
  load: boolean;
  audios: Components.Schemas.AudioStoryResponseDto[];
}
const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  book,
  onClickAuth,
  onClickRate,
  onClose,
  onUploadCover,
  children,
}) => {
  const [listAudioState, setListAudioState] = useState<ListAudiosState>({
    load: true,
    audios: [],
  });

  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
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
    console.log(book);

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

    apiClient.paths["/api/story/{storyId}/audio/all"]
      .get({ storyId: book.id })
      .then(
        (result: AxiosResponse<Components.Schemas.AudioStoryResponseDto[]>) => {
          console.log(result);
          setListAudioState({ load: false, audios: result.data });
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

  const [
    selectedAudio,
    setSelectedAudio,
  ] = useState<Components.Schemas.AudioResponseDto | null>(null);

  const handleOnClickRate = (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => {
    console.log("ON CLICK RATE");
    onClickRate(dto);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="[&>button]:hidden m-0 py-0 animate-zoom-in">
        <DialogHeader className="">
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
                        className="rounded-t-xl w-44 h-60 object-cover"
                      />
                    ) : (
                      <div className="w-44 h-60">
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
                <DialogTitle className="">
                  <div className="flex justify-between items-center space-x-2 mb-6">
                    <span>{infoBookState.book.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className=""
                      onClick={() => onClose()}
                    >
                      <Cross1Icon />
                    </Button>
                  </div>
                </DialogTitle>
                <DialogDescription className="-mt-2">
                  {listAudioState.load ? (
                    <Skeleton className="h-24" />
                  ) : (
                    <AudioBookPlayer
                      audios={listAudioState.audios}
                      onClickAuth={onClickAuth}
                      onClickRate={onClickRate}
                      onClose={() => console.log("close")}
                      hideHeader={true}
                    />
                  )}
                  <div className="flex space-x-4 mt-2">{children}</div>
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className={`${textAction.fullScreen ? "" : "-mt-16"}`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="story-text">
              <AccordionTrigger
                className="text-base outline-none justify-between max-w-44"
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
              <AccordionContent className="max-h-72 rounded-md overflow-auto mt-2">
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
                        className="size-8 border border-slate-800"
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
