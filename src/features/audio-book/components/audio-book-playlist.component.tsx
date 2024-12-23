import React from "react";
import { Components } from "@/api/schemas/client";
import { CaretDownIcon, StarIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export interface AudioBookPLaylistProps {
  audios: Components.Schemas.AudioResponseDto[];
  currentAudio: Components.Schemas.AudioResponseDto;
  onClickAudio: (audio: Components.Schemas.AudioResponseDto) => void;
}

const AudioBookPlaylist: React.FC<AudioBookPLaylistProps> = ({
  audios,
  currentAudio,
  onClickAudio: handleOnClickAudio,
}) => {
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        const caretIcon = document.getElementById("caret__dropdown");
        if (open && caretIcon) {
          caretIcon.setAttribute(
            "class",
            "size-6 animate-rotate-180 cursor-pointer"
          );
        } else {
          caretIcon?.setAttribute(
            "class",
            "size-6 animate-rotate-270 cursor-pointer"
          );
        }
      }}
    >
      <DropdownMenuTrigger className="flex drop-shadow-md" asChild>
        <CaretDownIcon id="caret__dropdown" className={`size-6 `} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="text-center">
          Доступные озвучки
        </DropdownMenuLabel>
        <Separator className="mb-1" />
        <Separator className="mb-4" />

        {audios.map((audio) => {
          return (
            <DropdownMenuItem
              key={`audio_lang_${audio.id}`}
              className="cursor-pointer flex flex-col  hover:bg-slate-100"
              onClick={() => handleOnClickAudio(audio)}
            >
              <div className="grid grid-cols-2 self-start w-full items-center ">
                <div className="flex flex-col items-start justify-items-start">
                  <small className="text-slate-500 -mb-1">{`${audio.author.firstName} ${audio.author.lastName}`}</small>
                  <div className="flex flex-col">
                    {audio.language.name.split("-").map((word) => (
                      <span className="font-semibold text-md">{word}</span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-[3px] self-center">
                  <StarIcon className="text-orange-500 ml-2 size-4" />
                  <span className="font-semibold text-orange-500">
                    {currentAudio.moderateScore > 0
                      ? currentAudio.moderateScore
                      : null}
                  </span>
                </div>
              </div>
              <Separator className="bg-slate-300" />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AudioBookPlaylist;
