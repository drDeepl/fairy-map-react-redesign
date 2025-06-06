import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NotCoverBook from "@/components/not-cover-book.component";
import React, { useEffect, useState } from "react";

import { CaretUpIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CoverUploadDto } from "../interfaces/cover-upload.dto";

import { Skeleton } from "@/components/ui/skeleton";

import { useMediaQuery } from "react-responsive";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";

interface BookInfoCardProps {
  load: boolean;
  book: Components.Schemas.StoryBookResponseDto;
  onUploadCover?: (
    dto: CoverUploadDto
  ) => Promise<Components.Schemas.StoryBookResponseDto>;
  onClickAddAudio: () => void;
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
}

interface TextAction {
  show: boolean;
  fullScreen: boolean;
}

interface InfoBookState {
  loadCover: boolean;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  load,
  book,
  onUploadCover,
  children,
  headerChildren,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
  });

  const [infoBookState, setInfoBookState] = useState<InfoBookState>({
    loadCover: true,
  });

  const handleShowText = (showText: boolean) => {
    setTextAction({ show: showText, fullScreen: false });
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

  useEffect(() => {
    setInfoBookState((prevState) => ({ ...prevState, loadCover: false }));
  }, []);

  if (isMobile) {
    return (
      <Card className="flex flex-col justify-center w-full border-none shadow-none">
        <CardHeader className="flex flex-col items-center justify-center w-full">
          {headerChildren}
          <CardTitle className="w-full py-3 m-0 text-center first-letter:uppercase text-res-lg">
            <span className="">{book.name}</span>
          </CardTitle>
          {!textAction.show ? (
            <CardDescription className="p-0 m-0">
              <div className="flex justify-center justify-items-center">
                {infoBookState.loadCover ? (
                  <div>
                    <Skeleton className="bg-neutral-300 size-44" />
                  </div>
                ) : (
                  <Label
                    htmlFor="picture"
                    className={`${onUploadCover ? "cursor-pointer" : ""}`}
                  >
                    {book.srcImg ? (
                      <img
                        src={book.srcImg}
                        alt={book.name}
                        className="object-cover size-44 rounded-t-xl"
                      />
                    ) : (
                      <div className="size-40 rounded-xl animate-shimmer">
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
            </CardDescription>
          ) : null}
          <div className="flex justify-between">
            <Button
              className="flex justify-between w-44 place-self-start py-0 px-2 m-0 [&_svg]:size-6"
              variant="link"
              onClick={() => {
                handleShowText(!textAction.show);
              }}
            >
              <span className="text-res-sm">
                {!textAction.show ? "показать текст..." : "скрыть текст"}
              </span>
              <CaretUpIcon
                className={`${
                  textAction.show ? "animate-rotate-180" : "animate-rotate-270"
                }`}
              />
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <motion.div
          className="h-full italic text-justify text-slate-800"
          initial="closed"
          animate={textAction.show ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: textAction.show ? "60svh" : "30svh",
            },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ScrollArea
            className={`${
              textAction.show ? "h-[60svh]" : "h-[30svh]"
            } px-4 pb-4`}
          >
            {book.text}
          </ScrollArea>
          <Separator />
        </motion.div>
        {!textAction.show && !textAction.fullScreen ? (
          <CardContent className="flex flex-col items-center space-y-2 text-xl">
            {children}
          </CardContent>
        ) : null}
      </Card>
    );
  }

  return (
    <Card className="p-0 m-0 border-none shadow-none">
      <CardHeader className="w-full py-0 m-0">
        {textAction.fullScreen ? null : (
          <div className="flex w-full gap-4 my-4 animate-out">
            <div className="flex justify-center h-56 w-44 justify-items-center">
              {infoBookState.loadCover ? (
                <div>
                  <Skeleton className="w-44 h-60 bg-neutral-300" />
                </div>
              ) : (
                <Label
                  htmlFor="picture"
                  className={`${onUploadCover ? "cursor-pointer" : ""}`}
                >
                  {book.srcImg ? (
                    <img
                      src={book.srcImg}
                      alt={book.name}
                      className="object-cover rounded-t-xl w-44 h-60"
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
              <CardTitle className="flex flex-col justify-between pb-2 m-0 mb-6 space-x-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="first-letter:uppercase text-res-base md:text-res-sm">
                    {book.name}
                  </span>
                  {headerChildren}
                </div>
                <Separator className="w-full bg-slate-300" />
              </CardTitle>

              {load ? (
                <Skeleton className="w-full h-24 bg-neutral-300" />
              ) : (
                <CardDescription>{children}</CardDescription>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            className="flex justify-between w-44 place-self-start p-0 m-0 [&_svg]:size-6"
            variant="link"
            onClick={() => {
              handleShowText(!textAction.show);
            }}
          >
            <span className="text-md md:text-lg">
              {!textAction.show ? "показать текст..." : "скрыть текст"}
            </span>
            <CaretUpIcon
              className={`${
                textAction.show ? "animate-rotate-180" : "animate-rotate-270"
              }`}
            />
          </Button>
          {textAction.show && (
            <Button
              variant="outline"
              size="icon"
              className="bg-white bg-opacity-50 border text-slate-600 border-slate-500"
              onClick={() =>
                setTextAction((prevState) => ({
                  ...prevState,
                  fullScreen: !prevState.fullScreen,
                }))
              }
            >
              <EnterFullScreenIcon />
            </Button>
          )}
        </div>
        <Separator />
      </CardHeader>

      {textAction.show && (
        <motion.div
          className="italic text-justify text-slate-800"
          initial="closed"
          animate={textAction.show ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: textAction.fullScreen ? "70svh" : "30svh",
            },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ScrollArea
            className={`${
              textAction.fullScreen ? "h-[70svh]" : "h-[30svh]"
            } px-4 pb-6`}
          >
            {book.text}
          </ScrollArea>
        </motion.div>
      )}
    </Card>
  );
};

export default React.memo(BookInfoCardComponent);
