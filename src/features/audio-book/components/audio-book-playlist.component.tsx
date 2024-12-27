import React, { useState } from "react";
import { Components } from "@/api/schemas/client";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { Separator } from "@/components/ui/separator";

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
export interface AudioBookPlaylistProps {
  audios: Components.Schemas.AudioResponseDto[];
  onClickAudio: (audio: Components.Schemas.AudioResponseDto) => void;
  children?: React.ReactNode;
}

const AudioBookPlaylist: React.FC<AudioBookPlaylistProps> = ({
  audios,
  onClickAudio,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    const caretIcon = document.getElementById("caret__dropdown");

    if (open && caretIcon) {
      caretIcon.setAttribute("class", "size-6 animate-rotate-180");
    } else {
      caretIcon?.setAttribute("class", "size-6 animate-rotate-270");
    }
    setOpen(open);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        id="popover__trigger"
        className="cursor-pointer flex drop-shadow-md space-x-1"
        asChild
      >
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="введите название озвучки..." />
          <CommandList>
            <CommandEmpty>озвучки не найдены</CommandEmpty>
            <CommandGroup>
              {audios.map((audio) => {
                return (
                  <CommandItem
                    key={`audio_lang_${audio.id}`}
                    className="cursor-pointer flex flex-col  p-0"
                    onSelect={() => {
                      onClickAudio(audio);
                      handleOpenChange(false);
                    }}
                  >
                    <Separator className="bg-slate-300" />
                    <div className="grid grid-cols-2 self-start w-full items-center p-1.5 hover:bg-slate-100">
                      <div className="flex flex-col items-start justify-items-start">
                        <small className="text-slate-500 -mb-1">{`${audio.author.firstName} ${audio.author.lastName}`}</small>
                        <div className="flex flex-col">
                          {audio.language.name.split("-").map((word, id) => (
                            <span
                              key={`word__${id}`}
                              className="font-semibold text-md"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-[3px] self-center">
                        {Array(5)
                          .fill(1)
                          .map((num, id) => {
                            if (audio.moderateScore > id) {
                              return (
                                <StarFilledIcon
                                  key={`rate__${id}`}
                                  className="text-orange-500 ml-2 size-4"
                                />
                              );
                            } else {
                              return (
                                <StarIcon
                                  key={`rate__${id}`}
                                  className="text-orange-500 ml-2 size-4"
                                />
                              );
                            }
                          })}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default AudioBookPlaylist;
