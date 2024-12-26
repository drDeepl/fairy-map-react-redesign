import React, { useState } from "react";
import { Components } from "@/api/schemas/client";
import { CaretDownIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LanguagesIcon } from "lucide-react";

export interface AudioBookPlaylistProps {
  audios: Components.Schemas.AudioResponseDto[];
  onClickAudio: (audio: Components.Schemas.AudioResponseDto) => void;
}

const AudioBookPlaylist: React.FC<AudioBookPlaylistProps> = ({
  audios,
  onClickAudio: handleOnClickAudio,
}) => {
  const [currentLang, setCurrenLang] = useState<string | null>(null);

  return (
    <div>
      <DropdownMenu
        onOpenChange={(open) => {
          const caretIcon = document.getElementById("caret__dropdown");
          if (open && caretIcon) {
            caretIcon.setAttribute("class", "size-6 animate-rotate-180");
          } else {
            caretIcon?.setAttribute("class", "size-6 animate-rotate-270");
          }
        }}
      >
        <DropdownMenuTrigger
          className=" cursor-pointer flex drop-shadow-md space-x-1"
          asChild
        >
          <div>
            <LanguagesIcon />
            <DropdownMenuLabel className="text-center">
              {currentLang === null ? "Выберите язык" : currentLang}
            </DropdownMenuLabel>
            <CaretDownIcon id="caret__dropdown" className={`size-6`} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="">
          <Separator className="mb-1" />

          {audios.map((audio) => {
            return (
              <DropdownMenuItem
                key={`audio_lang_${audio.id}`}
                className="cursor-pointer flex flex-col  p-0"
                onClick={() => {
                  handleOnClickAudio(audio);
                  setCurrenLang(audio.language.name);
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
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default AudioBookPlaylist;
