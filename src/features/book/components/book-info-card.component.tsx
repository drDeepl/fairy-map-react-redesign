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
import { useEffect, useState, useRef, Children } from "react";

import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
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
import AudioPlayer from "react-modern-audio-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAudiosByBookId } from "../book.actions";
import { useDispatch } from "react-redux";

interface BookInfoCardProps {
  open: boolean;
  book: Components.Schemas.StoryWithImgResponseDto;
  audios: Components.Schemas.AudioStoryResponseDto[];
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
  children?: React.ReactNode;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  open,
  book,
  onClose,
  onUploadCover,
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(fetchAudiosByBookId(book.id))
      .then((result) => {
        setInfoBookState((prevState) => ({
          ...prevState,
          audios: result.payload,
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
    setTextAction((prevState) => ({ ...prevState, fullScreen: fullScreen }));
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
    setAudioState((prevState) => ({ ...prevState, load: false, audio: audio }));
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
            <div className="w-full flex my-4 animate-out gap-4">
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
                  className="hidden"
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFile}
                />
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

                <ListAudios
                  audios={infoBookState.audios}
                  onSelectAudio={handleOnSelectAudio}
                />
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
                        },
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
