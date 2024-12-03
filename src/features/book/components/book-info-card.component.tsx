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
import { useState } from "react";

import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookInfoCardProps {
  open: boolean;
  book: Components.Schemas.StoryWithImgResponseDto;
  onClose: () => void;
}

interface TextAction {
  show: boolean;
  fullScreen: boolean;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({
  open,
  book,
  onClose,
}) => {
  const [textAction, setTextAction] = useState<TextAction>({
    show: false,
    fullScreen: false,
  });

  const [coverMenuOpen, setCoverMenuOpen] = useState<boolean>(false);

  const handleShowText = (showText: boolean) => {
    setTextAction({ show: showText, fullScreen: false });
  };

  const handleFullScreen = (fullScreen: boolean) => {
    console.log("handle fullScreen");
    console.log(fullScreen);
    setTextAction((prevState) => ({ ...prevState, fullScreen: fullScreen }));
    console.log(textAction);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleOnClickCover");
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]);
    }
  };

  const handleOnClickCover = () => {
    alert("ФУНКЦИЯ НАХОДИТСЯ В РАЗРАБОТКЕ");
    setCoverMenuOpen(!coverMenuOpen);
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
            <div className="grid grid-cols-2 grid-rows-1 my-4 animate-out">
              <Popover open={coverMenuOpen}>
                <PopoverTrigger onClick={handleOnClickCover}>
                  <div className="col-span-1 w-52 h-56 cursor-pointer">
                    {book.srcImg ? (
                      <img
                        src={book.srcImg}
                        alt={book.name}
                        className="rounded-t-xl w-52 h-56"
                      />
                    ) : (
                      <div className="size-full">
                        <NotCoverBook />
                      </div>
                    )}
                  </div>
                  <PopoverContent className="shadow-2xl">
                    <div className="flex flex-col space-y-2 justify-center">
                      <Input
                        id="picture"
                        type="file"
                        onChange={handleUploadFile}
                      />
                    </div>
                  </PopoverContent>
                </PopoverTrigger>
              </Popover>
              <div className="col-span-1">
                <DialogTitle>{book.name}</DialogTitle>
                <DialogDescription>{book.ethnicGroup.name}</DialogDescription>
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
