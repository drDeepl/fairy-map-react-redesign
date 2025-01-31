import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  TrackPreviousIcon,
  TrackNextIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";

import StarRating from "@/components/star-rating-motion";
import apiClient from "@/api/apiClient";
import { AxiosResponse } from "openapi-client-axios";

interface AudioPlayerProps {
  audioBook: Components.Schemas.AudioStoryResponseDto;
}

const AudioBook: React.FC<AudioPlayerProps> = ({ audioBook }) => {
  const audioRef = useRef(new Audio(audioBook.srcAudio));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentProgress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleRewind = () => {
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  const handleFastForward = () => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10
    );
  };

  const handleOnSelectStar = async (value: number): Promise<number> => {
    try {
      const res: AxiosResponse<
        Components.Schemas.AddedRatingAudioStoryDto,
        any
      > = await apiClient.paths["/api/story/rating/add"].post(null, {
        rating: value,
        audioId: audioBook.id,
      });

      return res.data.ratingAudioStory;
    } catch (error) {
      console.log(error);
      return audioBook.commonRating;
    }
  };

  return (
    <div className="flex flex-col w-72 space-x-2 space-y-2 items-center py-4 px-2 rounded-xl border border-slate-700 shadow-md">
      <div className="w-full flex flex-col items-center text-slate-500">
        <div className="w-full flex flex-col">
          <span className="text-md font-semibold">
            {audioBook.language.name} язык
          </span>
          <span className="">
            озвучил {audioBook.author.firstName} {audioBook.author.lastName}
          </span>
        </div>
        <div className="flex items-center">
          {/* <StarIcon className="size-8" />
          <span className="italic">({audioBook.commonRating}/5)</span> */}
          <StarRating
            currentRating={audioBook.commonRating}
            onClickStar={handleOnSelectStar}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          src={audioBook.srcAudio}
        />
        <div className="w-full bg-gray-500 rounded-full h-[0.25rem] overflow-hidden">
          <motion.div
            className="bg-blue-400 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex items-center mt-4 space-x-2 [&_svg]:text-gray-700">
          <button onClick={handleRewind} className="text-white">
            <TrackPreviousIcon className="size-6 stroke-none" />
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <PauseIcon className="size-8" />
            ) : (
              <PlayIcon className="size-8" />
            )}
          </button>
          <button onClick={handleFastForward} className="text-white">
            <TrackNextIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AudioBook;
