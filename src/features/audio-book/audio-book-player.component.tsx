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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { CaretDownIcon, Cross1Icon } from "@radix-ui/react-icons";
import { LanguagesIcon } from "lucide-react";

interface PlaylistState {
  open: boolean;
  load: boolean;
  currentAudio: Components.Schemas.AudioResponseDto;
}

interface AudioBookPlayerProps {
  audios: Components.Schemas.AudioResponseDto[];
  onClickRate?: (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ) => Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined>;
  onClickAuth?: () => void;
  onClose: () => void;
  onClickAddAudio?: () => void;
  hideHeader: boolean;
}

const AudioBookPlayer: React.FC<AudioBookPlayerProps> = ({
  audios,
  onClickRate,
  onClose,
  onClickAuth,
  onClickAddAudio,
  hideHeader,
}) => {
  const [playlistState, setPlaylistState] = useState<PlaylistState>({
    open: false,
    load: false,
    currentAudio: audios[0],
  });

  const handleOnError = () => {
    toast.error("произошла ошибка при загрузки аудиозаписи");
  };

  const handleOnClickAudio = (audio: Components.Schemas.AudioResponseDto) => {
    setPlaylistState((prevState) => ({ ...prevState, currentAudio: audio }));
  };

  const handleOnClickRate = async (value: number) => {
    if (!onClickRate) {
      return;
    }
    try {
      const addedRatingDto = await onClickRate({
        rating: value,
        audioId: playlistState.currentAudio.id,
      });
      if (addedRatingDto !== undefined) {
        setPlaylistState((prevState) => ({
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
      console.log(error);
      toast.error("что-то пошло не так");
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="p-0">
        {hideHeader ? null : (
          <CardTitle className="flex justify-between">
            <div>{playlistState.currentAudio.language.name}</div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Cross1Icon />
            </Button>
          </CardTitle>
        )}
        <div className="flex justify-between items-center">
          <AudioBookPlaylist audios={audios} onClickAudio={handleOnClickAudio}>
            <Button
              className="flex drop-shadow-md space-x-1 border-ghost text-balance h-12 w-full py-1"
              variant="outline"
            >
              <p>{playlistState.currentAudio.language.name} язык</p>
              <div className="flex ">
                <LanguagesIcon />
                <CaretDownIcon id="caret__dropdown" className={`size-6`} />
              </div>
            </Button>
          </AudioBookPlaylist>
        </div>

        <Separator className="my-2" />

        <CardDescription className="text-slate-700 text-lg text-center">
          <div className="flex flex-col justify-center items-center space-y-1 mb-2 -mr-2 animate-zoom-in">
            <div>
              <small className="text-slate-500 mr-1">озвучил:</small>
              <small className="text-slate-500">{`${playlistState.currentAudio.author.firstName} ${playlistState.currentAudio.author.lastName}`}</small>
            </div>

            <StarRating
              commonRating={playlistState.currentAudio.moderateScore}
              onClickRate={handleOnClickRate}
              onClickAuth={onClickAuth}
            />
          </div>
          <Separator className="my-2" />
          <div className="">
            {playlistState.load ? (
              <Skeleton className="flex self-center w-full h-8 bg-neutral-300" />
            ) : (
              <div className="">
                <ReactAudioPlayer
                  className="w-full"
                  controls
                  controlsList="nodownload noplaybackrate foobar"
                  src={playlistState.currentAudio.srcAudio}
                  onError={handleOnError}
                />
              </div>
            )}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AudioBookPlayer;
