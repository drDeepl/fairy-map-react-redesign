import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  TrackPreviousIcon,
  TrackNextIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";
import AudioBookPlaylist from "@/features/book/components/audio-book-playlist.component";
import StarRating from "@/components/star-rating-motion";

interface AudioPlayerProps {
  audioBooks: Components.Schemas.AudioStoryResponseDto[];
  onClickRate: (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ) => Promise<number>;
  children?: React.ReactNode;
}

const AudioBook: React.FC<AudioPlayerProps> = ({
  audioBooks,
  onClickRate,
  children,
}) => {
  const [selectedAudio, setSelectedAudio] =
    useState<Components.Schemas.AudioStoryResponseDto>(audioBooks[0]);

  const audioRef = useRef(new Audio(selectedAudio.srcAudio));

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

  const handleOnClickAudioBook = (
    audio: Components.Schemas.AudioStoryResponseDto
  ) => {
    setIsPlaying(false);
    setProgress(0);
    setSelectedAudio(audio);
    audioRef.current.src = audio.srcAudio;
  };

  return (
    <div>
      <div className="relative flex flex-col items-center space-y-2">
        <div className="p-1 absolute -top-6 left-[45%] bg-slate-950 rounded-full shadow-md">
          <StarRating
            className=""
            currentRating={selectedAudio.commonRating}
            onClickStar={(rating) => onClickRate(rating, selectedAudio)}
          />
        </div>
        <span className="absolute top-1.5 left-[49%] text-orange-500 italic text-md font-bold rounded-full">
          {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) / 10}
        </span>
      </div>
      <div className="flex flex-col items-center px-2 py-4 space-x-2 space-y-2 border shadow-md w-72 rounded-xl bg-slate-200 border-slate-950">
        <div className="flex flex-col w-full">
          <AudioBookPlaylist
            audios={audioBooks}
            currentAudio={selectedAudio}
            onClickAudioBook={handleOnClickAudioBook}
          />
          {children}
        </div>

        <div className="flex items-center justify-center w-full justify-items-center">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            src={selectedAudio.srcAudio}
          />
          <div className="w-full bg-gray-800 rounded-full h-[0.25rem] overflow-hidden">
            <motion.div
              className="h-full bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex items-center px-2 space-x-2  [&_svg]:text-slate-950">
            <button onClick={handleRewind} className="">
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
    </div>
  );
};
export default AudioBook;
