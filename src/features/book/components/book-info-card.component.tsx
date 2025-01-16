import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import NotCoverBook from "@/components/not-cover-book.component";
import { useState } from "react";

import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CoverUploadDto } from "../interfaces/cover-upload.dto";

import { Skeleton } from "@/components/ui/skeleton";

import AudioBookPlayer from "@/features/audio-book/audio-book-player.component";

import { useToast } from "@/hooks/use-toast";

import { FileAudio } from "lucide-react";

import { Toaster } from "@/components/ui/toaster";

import { RootState } from "@/app/store";
import { AuthState } from "@/features/auth/auth.slice";
import { useSelector } from "react-redux";

interface BookInfoCardProps {
  load: boolean;
  book: Components.Schemas.StoryBookResponseDto;

  audios: Components.Schemas.AudioStoryResponseDto[];
  onClose: () => void;
  onUploadCover?: (
    dto: CoverUploadDto
  ) => Promise<Components.Schemas.StoryBookResponseDto>;

  onClickAddAudio: () => void;
  onClickAuth?: () => void;
  onClickRate?: (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined>;
  children?: React.ReactNode;
}

interface TextAction {
  show: boolean;
  fullScreen: boolean;
}

interface InfoBookState {
  loadCover: boolean;
  book: Components.Schemas.StoryBookResponseDto;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  load,
  book,
  audios,
  onClickAuth,
  onClickRate,
  onUploadCover,
  onClickAddAudio,
  children,
}) => {
  const { toast } = useToast();
  const { user }: AuthState = useSelector((state: RootState) => state.auth);

  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
  });

  const [infoBookState, setInfoBookState] = useState<InfoBookState>({
    loadCover: false,
    book: book,
  });

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

  const handleOnClickAddAudio = () => {
    if (!user) {
      toast({
        style: {
          border: "1.5px solid var(--deep-red)",
          right: "2rem",
        },
        title:
          "подать заявку на добавление озвучки могут только авторизованные пользователи",
        action: (
          <Button onClick={() => (onClickAuth ? onClickAuth() : null)}>
            войти
          </Button>
        ),
      });
    } else {
      onClickAddAudio();
    }
  };

  return (
    <Card className="border-none">
      <Toaster />
      <CardHeader className="m-0 py-0 w-full">
        {textAction.fullScreen ? null : (
          <div className="w-full flex my-4 animate-out gap-4">
            <div className="w-44 h-56 flex justify-items-center justify-center">
              {infoBookState.loadCover ? (
                <div>
                  {/* <LoadSpinner /> */}
                  <Skeleton className="w-44 h-60 bg-neutral-300" />
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
                    <div className="w-44 h-60 animate-shimmer">
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
              <CardTitle>
                <div className="flex justify-between items-center space-x-2 mb-6">
                  <span>{infoBookState.book.name}</span>
                </div>
              </CardTitle>
              {load ? (
                <Skeleton className="w-full h-24 bg-neutral-300" />
              ) : (
                <CardDescription className="-mt-2 flex">
                  <div className="flex -mb-12">
                    {audios.length > 0 ? (
                      <AudioBookPlayer
                        audios={audios}
                        onClickAuth={onClickAuth}
                        onClickRate={onClickRate}
                        onClose={() => console.log("close")}
                        hideHeader={true}
                      />
                    ) : (
                      <p className="self-center">аудиокниги не найдены</p>
                    )}
                    {children ? (
                      <div className="flex items-center cursor-pointer ml-2 mt-1 size-10">
                        {children}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center cursor-pointer border border-ghost rounded-md shadow-md ml-2 mt-1 size-10">
                          <FileAudio
                            className="size-9 text-slate-700 p-2"
                            onClick={handleOnClickAddAudio}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardDescription>
              )}
            </div>
          </div>
        )}
      </CardHeader>

      <CardFooter>
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
              {load ? (
                // <LoadSpinner />
                <div>
                  {Array(3)
                    .fill(1)
                    .map((value) => (
                      <Skeleton
                        key={value}
                        className="w-full h-4 bg-zinc-300 my-2"
                      />
                    ))}
                </div>
              ) : (
                <div className="text-base">
                  <p className="row-span-1 flex justify-center">{book.text}</p>
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
      </CardFooter>
    </Card>
  );
};

export default BookInfoCardComponent;
