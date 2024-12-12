import { Components } from "@/api/schemas/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import ReactAudioPlayer from "react-audio-player";
import { toast } from "sonner";

import { ListMusicIcon } from "lucide-react";
import { Cross2Icon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/rating.component";

interface PlayListState {
  load: boolean;
  currentAudio: Components.Schemas.AudioResponseDto;
}

interface AudioBookPlayerProps {
  title: string;
  audios: Components.Schemas.AudioResponseDto[];
  onClose: () => void;
  onClickAuth: () => void;
}

interface RateState {
  load: boolean;
  open: boolean;
  currentRate: number;
}

const AudioBookPlayer: React.FC<AudioBookPlayerProps> = ({
  title,
  audios,
  onClose,
  onClickAuth,
}) => {
  const [playListState, setPlayListState] = useState<PlayListState>({
    load: false,
    currentAudio: audios[0],
  });

  const handleOnError = (e: Event) => {
    console.log(e);

    toast.error("произошла ошибка при загрузки аудиозаписи");
  };

  const handleOnClickAudio = (audio: Components.Schemas.AudioResponseDto) => {
    setPlayListState((prevState) => ({ ...prevState, currentAudio: audio }));
  };

  const [rateState, setRateState] = useState<RateState>({
    load: true,
    open: false,
    currentRate: 0,
  });

  const handleOnClickStar = () => {
    setRateState((prevState) => ({ ...prevState, open: !rateState.open }));
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="text-slate-700 text-lg text-center">
          <div className="flex items-center justify-center space-x-2 space mb-2">
            <div className="flex flex-col">
              <small className="col-span-1 text-slate-500 -mb-1">{`${playListState.currentAudio.author.firstName} ${playListState.currentAudio.author.lastName}`}</small>
              <span className="font-semibold text-md">
                {playListState.currentAudio.language.name}
              </span>

              <div className="flex justify-center items-center space-x-[3px]">
                <StarRating
                  onClickRate={(value: number) => toast.success(value)}
                  onClickAuth={onClickAuth}
                />
              </div>
              <span className="font-semibold text-orange-500">
                {rateState.currentRate > 0 ? rateState.currentRate : null}
              </span>
            </div>
          </div>
          <Separator className="bg-slate-300" />
        </DialogDescription>
        {playListState.load ? (
          <Skeleton className="flex self-center w-full h-8 bg-neutral-300" />
        ) : (
          <div className="flex items-center">
            <ReactAudioPlayer
              className="w-full"
              controls
              controlsList="nodownload noplaybackrate foobar"
              src={playListState.currentAudio.srcAudio}
              onError={handleOnError}
            />
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ListMusicIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  {audios.map((audio) => {
                    return (
                      <DropdownMenuItem
                        key={`audio_lang_${audio.id}`}
                        className="cursor-pointer flex flex-col"
                        onClick={() => handleOnClickAudio(audio)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col">
                            <small className="col-span-1 text-slate-500 -mb-1">{`${audio.author.firstName} ${audio.author.lastName}`}</small>
                            <span className="font-semibold text-md">
                              {audio.language.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-[3px]">
                            <StarIcon className="text-orange-500 ml-2 size-4" />
                            <span className="font-semibold text-orange-500">
                              {playListState.currentAudio.moderateScore > 0
                                ? playListState.currentAudio.moderateScore
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
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AudioBookPlayer;
