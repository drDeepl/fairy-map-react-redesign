import React, { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

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
  onError: (e: Event) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onError }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number[]>([0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const resetAudioPlayer = () => {
    setIsPlaying(false);
    setProgress([0]);
    setDuration(0);
    setCurrentTime(0);
  };

  const audioRef = useRef(new Audio(src));

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    console.log(value);
    const newProgress = Number(value[0]);

    audio.currentTime = (newProgress / 100) * duration;
    setProgress(value);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress([progressPercent]);
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("loadstart", (e) => {
      resetAudioPlayer();
    });
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", () => {
      resetAudioPlayer();
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="flex items-center justify-center w-full gap-2">
        <div className="flex flex-col justify-between w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {formatTime(currentTime)}
            </span>

            <span className="text-sm text-gray-600">
              {formatTime(duration)}
            </span>
          </div>

          <Slider
            className="w-full [&>span:first-child>span]:bg-blue-500 cursor-pointer py-1"
            min={0}
            max={100}
            value={progress}
            onValueChange={handleProgressChange}
          />
        </div>
        <motion.div
          className="flex p-1 mt-3 border rounded-full cursor-pointer size-10 border-slate-700"
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

      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
