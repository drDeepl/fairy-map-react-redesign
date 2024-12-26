import { Components } from "@/api/schemas/client";

import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import ReactAudioPlayer from "react-audio-player";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/rating.component";
import AudioBookPlaylist from "./components/audio-book-playlist.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

interface PlayListState {
  load: boolean;
  currentAudio: Components.Schemas.AudioResponseDto;
}

interface AudioBookPlayerProps {
  audioBook: Components.Schemas.PreviewAudioStoryResponseDto;
  onClickRate: (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined>;
  onClose: () => void;
  onClickAuth: () => void;
}

const AudioBookPlayer: React.FC<AudioBookPlayerProps> = ({
  audioBook,
  onClickRate,
  onClose,
  onClickAuth,
}) => {
  const [playListState, setPlayListState] = useState<PlayListState>({
    load: false,
    currentAudio: audioBook.audios[0],
  });

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>{audioBook.name}</div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Cross1Icon />
          </Button>
        </CardTitle>

        <CardDescription className="text-slate-700 text-lg text-center">
          <div className="flex items-center justify-center space-x-2 space mb-2 animate-zoom-in">
            <div className="flex flex-col items-center justify-items-center border-r-2">
              <small className="col-span-1 text-slate-500 -mb-1 self-center">{`${playListState.currentAudio.author.firstName} ${playListState.currentAudio.author.lastName}`}</small>

              <div className="flex justify-center items-center">
                <span className="font-semibold text-md">
                  {playListState.currentAudio.language.name}
                </span>
              </div>

              <div className="flex justify-center items-center space-x-[3px] mt-1">
                <StarRating
                  commonRating={playListState.currentAudio.moderateScore}
                  onClickRate={handleOnClickRate}
                  onClickAuth={onClickAuth}
                />
              </div>
            </div>

            <AudioBookPlaylist
              audios={audioBook.audios}
              onClickAudio={handleOnClickAudio}
            />
          </div>
          <Separator className="bg-slate-300" />
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default AudioBookPlayer;
