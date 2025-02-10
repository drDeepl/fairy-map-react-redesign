import React from "react";
import { Components } from "../../../api/schemas/client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@/components/dropdown-menu-motion.component";
import { LanguagesIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AudioBookPlaylistProps {
  currentAudio: Components.Schemas.AudioStoryResponseDto;
  audios: Components.Schemas.AudioStoryResponseDto[];
  onClickAudioBook: (audio: Components.Schemas.AudioStoryResponseDto) => void;
  className?: string;
  size?: "default" | "compact";
}

export const AudioBookPlaylist: React.FC<AudioBookPlaylistProps> = ({
  currentAudio,
  audios,
  onClickAudioBook,
  className,
  size = "default",
}) => {
  return (
    <div className={`flex flex-col w-full  text-slate-950 ${className}`}>
      <Dropdown className="w-full">
        <DropdownTrigger className="hover:bg-slate-200 px-2 [&>*:not(div)]:text-slate-700 p-2">
          {size === "default" && (
            <div className="flex flex-col w-2/3">
              <div className="flex space-x-1">
                <small className="text-sm">озвучил:</small>
                <small className="text-sm">
                  {currentAudio.author.firstName}
                </small>
                <small className="text-sm">
                  {currentAudio.author.lastName}
                </small>
              </div>
              <span className="m-0 text-lg font-semibold leading-[18px]">
                {currentAudio.language.name} язык
              </span>
            </div>
          )}
          <LanguagesIcon className="-mr-14" />
        </DropdownTrigger>
        <DropdownMenu
          className={`${size === "compact" ? "w-64 right-0" : "w-full"}`}
        >
          <ScrollArea className="h-56">
            {audios.map((audio: Components.Schemas.AudioStoryResponseDto) => (
              <DropdownItem
                onSelect={() => {
                  onClickAudioBook(audio);
                }}
                key={audio.id}
                className="flex items-center justify-between w-full h-20 px-2 py-1 border text-slate-950 border-b-slate-300"
              >
                <div className="flex flex-col space-y-1 leading-none w-44 text-res-sm sm:text-res-xs">
                  <span className="text-xs text-slate-600">
                    {`озвучил: ${audio.author.firstName} ${audio.author.lastName}`}
                  </span>
                  <span className="font-semibold">
                    {audio.language.name} язык
                  </span>
                </div>

                <div className="flex flex-col items-center w-20 space-y-0.5">
                  <StarFilledIcon className="text-orange-500 size-6" />
                  <small className="italic leading-none text-orange-500 text-res-sm sm:text-res-xs">
                    {`( ${audio.commonRating} )`}
                  </small>
                </div>
              </DropdownItem>
            ))}
          </ScrollArea>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default AudioBookPlaylist;
