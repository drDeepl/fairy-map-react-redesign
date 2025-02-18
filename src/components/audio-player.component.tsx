import React, { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/features/audio-book/components/audio.provider";

const iconVariants = {
  play: {
    rotate: 0,
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  pause: {
    rotate: 180,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

interface AudioPlayerProps {
  src: string;
  onError: (msg: string) => void;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  onError,
  className = "",
}) => {
  const {
    state,
    error,
    play,
    pause,
    resume,
    onProgressChange,
    resetError,
  } = useAudioPlayer();

  useEffect(() => {
    if (error !== null) {
      onError(error);
      resetError();
    }
  }, [error]);

  useEffect(() => {
    if (state.currentTrack?.src !== src) {
      play({ src });
    }
  }, [src]);

  const togglePlayPause = () => {
    if (state.isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${className}`}
    >
      <div className="flex items-center justify-center w-full gap-2">
        <div className="flex flex-col justify-between w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {formatTime(state.currentTime)}
            </span>

            <span className="text-sm text-gray-600">
              {formatTime(state.duration)}
            </span>
          </div>

          <Slider
            className="w-full [&>span:first-child>span]:bg-blue-500 [&>span:nth-child(2)>span]:bg-blue-500 [&>span:nth-child(2)>span]:border-none cursor-pointer py-1"
            min={0}
            max={100}
            value={state.progress}
            onValueChange={onProgressChange}
          />
        </div>
        <motion.div
          className="flex p-1 my-2 border rounded-full cursor-pointer size-10 border-slate-700"
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            initial={false}
            animate={state.isPlaying ? "pause" : "play"}
            variants={iconVariants}
          >
            {state.isPlaying ? (
              <>
                <motion.rect
                  x="6"
                  y="4"
                  className={`w-[4px] h-[16px] fill-slate-700`}
                  initial={{ scaleY: 0.4 }}
                  animate={{ scaleY: 1 }}
                />
                <motion.rect
                  className={`w-[4px] h-[16px] fill-slate-700`}
                  x="14"
                  y="4"
                  initial={{ scaleY: 0.4 }}
                  animate={{ scaleY: 1 }}
                />
              </>
            ) : (
              <motion.path
                className=" fill-slate-700"
                d="M8 5v14l11-7z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            )}
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPlayer;
