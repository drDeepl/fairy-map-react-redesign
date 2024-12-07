import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { loremIpsumText } from "../constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import NotCoverBook from "@/components/not-cover-book.component";
import { useEffect, useState, useRef } from "react";

import {
  EnterFullScreenIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CoverUploadDto } from "../interfaces/cover-upload.dto";
import ListAudios from "./audio-book/list-audios.component";
import apiClient from "@/api/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

interface BookInfoCardProps {
  open: boolean;
  book: Components.Schemas.StoryWithImgResponseDto;
  onClose: () => void;
  onUploadCover: (
    dto: CoverUploadDto
  ) => Promise<Components.Schemas.StoryWithImgResponseDto>;
}

interface TextAction {
  show: boolean;
  fullScreen: boolean;
}

interface InfoBookState {
  loadCover: boolean;
  loadAudio: boolean;
  audios: Components.Schemas.AudioStoryResponseDto[];
  book: Components.Schemas.StoryWithImgResponseDto;
}

interface AudioState {
  isPlaying: boolean;
  load: boolean;
  audio: Components.Schemas.AudioStoryResponseDto | null;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  open,
  book,
  onClose,
  onUploadCover,
}) => {
  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
  });

  const [infoBookState, setInfoBookState] = useState<InfoBookState>({
    loadCover: false,
    loadAudio: true,
    audios: [],
    book: book,
  });

  useEffect(() => {
    apiClient
      .StoryController_getAudiosByStoryId(book.id)
      .then((result) => {
        console.log(result);
        setInfoBookState((prevState) => ({
          ...prevState,
          audios: result.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowText = (showText: boolean) => {
    setTextAction({ show: showText, fullScreen: false });
  };

  const handleFullScreen = (fullScreen: boolean) => {
    console.log("handle fullScreen");
    console.log(fullScreen);
    setTextAction((prevState) => ({ ...prevState, fullScreen: fullScreen }));
    console.log(textAction);
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const updatedBook = await onUploadCover({
        storyId: book.id,
        img: event.target.files[0],
      });
      console.error(updatedBook);

      setInfoBookState((prevState) => ({
        ...prevState,
        book: updatedBook,
      }));
    }
  };

  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    audio: null,
    load: false,
  });

  const handleOnSelectAudio = async (
    audio: Components.Schemas.AudioStoryResponseDto
  ) => {
    setAudioState((prevState) => ({ ...prevState, load: true }));
    const audioFile = await apiClient.StoryController_getAudioStoryById(
      audio.audioId
    );
    setAudioState((prevState) => ({ ...prevState, load: false, audio: audio }));
    console.log(audioFile);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          {textAction.fullScreen ? null : (
            <div className="flex my-4 animate-out gap-4">
              <div className="w-44 h-56">
                <Label htmlFor="picture" className="cursor-pointer">
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
                <Input
                  className="invisible"
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFile}
                />
              </div>
              <div className="">
                <DialogTitle>{infoBookState.book.name}</DialogTitle>
                <DialogDescription>
                  {infoBookState.book.ethnicGroup.name}
                </DialogDescription>

                <ListAudios
                  audios={infoBookState.audios}
                  onSelectAudio={handleOnSelectAudio}
                />
                {audioState.audio && !audioState.load ? (
                  <div className="flex space-x-4 justify-center mt-2">
                    <TrackPreviousIcon className="size-6 cursor-pointer" />
                    <PlayIcon className="size-6 cursor-pointer" />
                    <TrackNextIcon className="size-6 cursor-pointer" />
                  </div>
                ) : null}
                {audioState.load ? (
                  <Skeleton className="w-full h-10 mt-2" />
                ) : null}
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
                  <span className="animate-in">
                    {!textAction.show ? "показать текст" : "скрыть текст"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="max-h-72 rounded-md border overflow-auto">
                <div className="text-base">
                  <p className="row-span-1">{loremIpsumText}</p>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookInfoCardComponent;
