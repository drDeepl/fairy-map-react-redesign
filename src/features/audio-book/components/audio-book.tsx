import React, { useEffect, useState } from "react";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";
import AudioBookPlaylist from "@/features/book/components/audio-book-playlist.component";
import TooltipStarRating from "@/components/tooltip-star-rating-motion";

import TapableButton from "@/components/tapable-button.component";
import AudioPlayer from "@/components/audio-player.component";
import { useDispatch, useSelector } from "react-redux";
import { loadAudioBook } from "../audio-book-player.slice";
import { RootState } from "@/app/store";
import { useAudioContext } from "./audio.provider";

interface AudioPlayerProps {
  audioBooks: Components.Schemas.AudioStoryResponseDto[];
  onError: (msg: string) => void;
  onClickRate?: (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ) => Promise<number>;
  compactMode?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const AudioBook: React.FC<AudioPlayerProps> = ({
  audioBooks,
  onClickRate,
  onError,
  compactMode = false,
  children,
  className = "",
}) => {
  const dispatch = useDispatch();
  const currentAudioBook = useSelector(
    (state: RootState) => state.audioBookPlayer.currentAudioBook
  );

  const audioContext = useAudioContext();

  const [selectedAudio, setSelectedAudio] = useState<
    Components.Schemas.AudioStoryResponseDto
  >(currentAudioBook || audioBooks[0]);

  useEffect(() => {
    if (currentAudioBook) {
      setSelectedAudio(currentAudioBook);
      audioContext?.playTrack(currentAudioBook.srcAudio);
    } else {
      setSelectedAudio(audioBooks[0]);
    }
  }, []);

  const handleOnClickStar = async (rating: number) => {
    if (onClickRate) {
      const newRating = await onClickRate(rating, selectedAudio);

      setSelectedAudio((prevState) => ({
        ...prevState,
        commonRating: newRating,
      }));

      return newRating;
    } else {
      return selectedAudio.commonRating;
    }
  };

  const handleOnClickAudioBook = (
    audio: Components.Schemas.AudioStoryResponseDto
  ) => {
    console.log(audio);
    dispatch(loadAudioBook(audio));
    audioContext?.playTrack(audio.srcAudio);
    // setSelectedAudio(audio);
  };

  if (compactMode) {
    return (
      <div
        className={`flex flex-col items-center justify-around w-full max-w-xl space-y-2 border shadow-md rounded-b-xl rounded-tl-xl border-orange-950 bg-gray-50 ${className}`}
      >
        <AudioBookPlaylist
          className="px-2"
          audios={audioBooks}
          currentAudio={selectedAudio}
          onClickAudioBook={handleOnClickAudioBook}
        />
        <div className="flex items-center w-full px-2 space-x-1">
          <AudioPlayer
            src={selectedAudio.srcAudio}
            onError={(e) => onError("ошибка при загрузке озвучки")}
          />

          <div className="flex items-center space-x-1">
            <TooltipStarRating
              className="[&>*:not(:first-child)]:bg-slate-950"
              currentRating={selectedAudio.commonRating}
              onClickStar={handleOnClickStar}
              size={8}
            >
              <TapableButton className="flex items-center bg-orange-200 border border-orange-500 rounded-full">
                <StarFilledIcon className="self-start text-orange-500 size-7" />
              </TapableButton>
            </TooltipStarRating>
            <small className="text-sm italic text-orange-500 pointer-events-none md:text-res-sm">
              {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) /
                10}
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center [&>:not(:first-child)]:px-2 space-x-2 space-y-2 border shadow-md rounded-b-xl rounded-tl-xl border-orange-950 bg-gray-50">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center px-4 mb-1 bg-orange-100 border border-l-orange-500 border-b-orange-500 bg-opacity-95 w-fit place-self-end rounded-bl-2xl">
            <TooltipStarRating
              className="[&>*:not(:first-child)]:bg-slate-950"
              currentRating={selectedAudio.commonRating}
              onClickStar={handleOnClickStar}
              size={8}
            >
              <div className="flex items-center justify-center">
                <TapableButton className="flex items-center justify-center">
                  <StarFilledIcon className="self-center text-orange-500 size-8" />
                </TapableButton>
              </div>
            </TooltipStarRating>

            <span className="italic font-bold text-orange-500 rounded-full text-md md:text-res-sm">
              {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) /
                10}
            </span>
          </div>
        </div>
        <AudioBookPlaylist
          audios={audioBooks}
          currentAudio={selectedAudio}
          onClickAudioBook={handleOnClickAudioBook}
        />
        {children}

        <AudioPlayer
          src={selectedAudio.srcAudio}
          audioContext={audioContext}
          onError={(e) => onError("ошибка при загрузке озвучки")}
        />
      </div>
    </div>
  );
};
export default AudioBook;
