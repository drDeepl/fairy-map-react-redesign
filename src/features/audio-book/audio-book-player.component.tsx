import { Components } from "@/api/schemas/client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import ReactAudioPlayer from "react-audio-player";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/rating.component";
import AudioBookPlaylist from "./components/audio-book-playlist.component";

interface PlayListState {
  load: boolean;
  currentAudio: Components.Schemas.AudioResponseDto;
}

interface AudioBookPlayerProps {
  title: string;
  audios: Components.Schemas.AudioResponseDto[];
  onClickRate: (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined>;
  onClose: () => void;
  onClickAuth: () => void;
}

const AudioBookPlayer: React.FC<AudioBookPlayerProps> = ({
  title,
  audios,
  onClickRate,
  onClose,
  onClickAuth,
}) => {
  const [playListState, setPlayListState] = useState<PlayListState>({
    load: false,
    currentAudio: audios[0],
  });

  useEffect(() => {});

  const handleOnError = (e: Event) => {
    toast.error("произошла ошибка при загрузки аудиозаписи");
  };

  const handleOnClickAudio = (audio: Components.Schemas.AudioResponseDto) => {
    setPlayListState((prevState) => ({ ...prevState, currentAudio: audio }));
  };

  const handleOnClickRate = async (value: number) => {
    try {
      const addedRatingDto = await onClickRate({
        rating: value,
        audioId: playListState.currentAudio.id,
      });
      if (addedRatingDto !== undefined) {
        setPlayListState((prevState) => ({
          ...prevState,
          currentAudio: {
            ...prevState.currentAudio,
            moderateScore: addedRatingDto.ratingAudioStory,
          },
        }));
      } else {
        toast.error("что-то пошло не так...");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              <div className="flex justify-center items-center">
                <span className="font-semibold text-md">
                  {playListState.currentAudio.language.name}
                </span>
                <AudioBookPlaylist
                  audios={audios}
                  onClickAudio={handleOnClickAudio}
                />
              </div>

              <div className="flex justify-center items-center space-x-[3px] mt-1">
                <StarRating
                  commonRating={playListState.currentAudio.moderateScore}
                  onClickRate={handleOnClickRate}
                  onClickAuth={onClickAuth}
                />
              </div>
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
            <div></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AudioBookPlayer;
