import React, { useState } from "react";
import { Components } from "@/api/schemas/client";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";

import { StarFilledIcon } from "@radix-ui/react-icons";
interface ListAudiosProps {
  audios: Components.Schemas.AudioStoryResponseDto[];
  onSelectAudio: (audio: Components.Schemas.AudioStoryResponseDto) => void;
}

export const ListAudios: React.FC<ListAudiosProps> = ({
  audios,
  onSelectAudio,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedAudio, setSelectedAudio] =
    useState<Components.Schemas.AudioStoryResponseDto | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mt-2"
        >
          {value
            ? audios.find((audio) => audio.language.name === value)?.language
                .name
            : "Выберите озвучку..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder="поиск озвучки..." />
          <CommandList>
            <CommandEmpty>Озвучки не найдены</CommandEmpty>
            <CommandGroup>
              {audios.map((audio) => (
                <CommandItem
                  key={audio.id}
                  value={`${audio.language.name}`}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setSelectedAudio(audio);
                    onSelectAudio(audio);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col w-5/6">
                    <div className="text-xs text-slate-500">
                      <span className="mr-1">Озвучил</span>
                      <span className="m-1">{audio.author.firstName}</span>
                      <span className="m-1">{audio.author.lastName}</span>
                    </div>
                    <span className="font-semibold">{audio.language.name}</span>
                  </div>
                  <div className="flex space-x-1 text-orange-500">
                    <StarFilledIcon className="self-center" />
                    <span className="font-semibold">{audio.moderateScore}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedAudio?.id === audio.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default ListAudios;
