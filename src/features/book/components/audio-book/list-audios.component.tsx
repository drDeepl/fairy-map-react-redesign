import React, { useState, useEffect } from "react";
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
interface ListAudiosProps {
  audios: Components.Schemas.AudioStoryLanguageDto[];
}

export const ListAudios: React.FC<ListAudiosProps> = ({ audios }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-60 justify-between mt-2"
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
                  value={audio.language.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {audio.language.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === audio.language.name
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
