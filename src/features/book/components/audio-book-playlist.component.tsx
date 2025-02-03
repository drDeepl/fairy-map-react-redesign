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

interface AudioBookPlaylistProps {
  currentAudio: Components.Schemas.AudioStoryResponseDto;
  audios: Components.Schemas.AudioStoryResponseDto[];
  onClickAudioBook: (audio: Components.Schemas.AudioStoryResponseDto) => void;
}

export const AudioBookPlaylist: React.FC<AudioBookPlaylistProps> = ({
  currentAudio,
  audios,
  onClickAudioBook,
}) => {
  return (
    <div className="flex flex-col w-full pt-4 text-slate-950">
      <Dropdown className="w-full">
        <DropdownTrigger className="bg-slate-200 hover:bg-slate-300 px-2 [&>*:not(div)]:text-slate-700">
          <div className="flex flex-col w-2/3">
            <div className="flex space-x-1">
              <small className="text-sm">озвучил:</small>
              <small className="text-sm">{currentAudio.author.firstName}</small>
              <small className="text-sm">{currentAudio.author.lastName}</small>
            </div>
            <span className="m-0 text-lg font-semibold">
              {currentAudio.language.name} язык
            </span>
          </div>
          <LanguagesIcon className="-mr-14" />
        </DropdownTrigger>
        <DropdownMenu>
          {audios.map((audio: Components.Schemas.AudioStoryResponseDto) => (
            <DropdownItem
              onSelect={() => {
                onClickAudioBook(audio);
              }}
              key={audio.id}
              className="flex items-center justify-between w-full px-2 py-2 text-slate-950"
            >
              <div className="flex flex-col w-44">
                <span className="-mb-1 text-xs text-slate-600">
                  {`озвучил: ${audio.author.firstName} ${audio.author.lastName}`}
                </span>
                <span className="text-sm font-semibold lg:text-lg sm:text-sm">
                  {audio.language.name} язык
                </span>
              </div>

              <div className="flex items-center">
                <StarFilledIcon className="text-orange-500 size-6" />
                <span className="italic text-orange-500">
                  {`( ${audio.commonRating} )`}
                </span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default AudioBookPlaylist;
