import React, { useState } from "react";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";
import AudioBookPlaylist from "@/features/book/components/audio-book-playlist.component";
import TooltipStarRating from "@/components/tooltip-star-rating-motion";

import TapableButton from "@/components/tapable-button.component";
import AudioPlayer from "@/components/audio-player.component";

interface AudioPlayerProps {
  audioBooks: Components.Schemas.AudioStoryResponseDto[];
  onError: (msg: string) => void;
  onClickRate?: (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ) => Promise<number>;

  children?: React.ReactNode;
}

const AudioBook: React.FC<AudioPlayerProps> = ({
  audioBooks,
  onClickRate,
  onError,
  children,
}) => {
  const [selectedAudio, setSelectedAudio] =
    useState<Components.Schemas.AudioStoryResponseDto>(audioBooks[0]);

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
    setSelectedAudio(audio);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center pb-4 space-x-2 space-y-2 border shadow-md rounded-b-xl rounded-tl-xl border-orange-950 bg-gray-50">
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
          <AudioBookPlaylist
            className="px-2"
            audios={audioBooks}
            currentAudio={selectedAudio}
            onClickAudioBook={handleOnClickAudioBook}
          />
          {children}
        </div>

        {/* <div className="flex items-center justify-center w-full px-2 justify-items-center">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            src={selectedAudio.srcAudio}
          />
          <div className="w-full bg-gray-800 rounded-full h-[0.25rem] overflow-hidden">
            <motion.div
              className="h-full origin-left bg-blue-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex items-center px-2 space-x-2  [&_svg]:text-slate-950">
            <TapableButton onClick={handleRewind}>
              <TrackPreviousIcon className="size-6 stroke-none" />
            </TapableButton>

            <IconContainer
              className="p-1.5 border rounded-full border-slate-700"
              onClick={togglePlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                initial={false}
                animate={isPlaying ? "pause" : "play"}
                variants={iconVariants}
              >
                {isPlaying ? (
                  // Анимированные линии паузы
                  <>
                    <motion.rect
                      x="6"
                      y="4"
                      className={`w-[4px] h-[16px]`}
                      fill="currentColor"
                      initial={{ scaleY: 0.4 }}
                      animate={{ scaleY: 1 }}
                    />
                    <motion.rect
                      className={`w-[4px] h-[16px]`}
                      x="14"
                      y="4"
                      fill="currentColor"
                      initial={{ scaleY: 0.4 }}
                      animate={{ scaleY: 1 }}
                    />
                  </>
                ) : (
                  // Анимированный треугольник плей
                  <motion.path
                    className=" fill-slate-700"
                    d="M8 5v14l11-7z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                )}
              </motion.svg>
            </IconContainer>
            <TapableButton onClick={handleFastForward} className="text-white">
              <TrackNextIcon className="size-6" />
            </TapableButton>
          </div>
        </div> */}
        <AudioPlayer
          src={selectedAudio.srcAudio}
          onError={(e) => onError("ошибка при загрузке озвучки")}
        />
      </div>
    </div>
  );
};
export default AudioBook;
