import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  TrackPreviousIcon,
  TrackNextIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";

interface AudioPlayerProps {
  audioBook: Components.Schemas.AudioStoryResponseDto;
  children?: React.ReactNode;
}

const AudioBook: React.FC<AudioPlayerProps> = ({ audioBook, children }) => {
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

  return (
    <div className="flex flex-col w-72 space-x-2 space-y-2 items-center py-4 px-2 rounded-xl bg-slate-200 border border-slate-950 shadow-md">
      <div className="w-full">{children}</div>
      <div className="flex w-full justify-items-center items-center justify-center">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          src={audioBook.srcAudio}
        />
        <div className="w-full bg-gray-800 rounded-full h-[0.25rem] overflow-hidden">
          <motion.div
            className="bg-blue-400 h-full"
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
  );
};
export default AudioBook;
