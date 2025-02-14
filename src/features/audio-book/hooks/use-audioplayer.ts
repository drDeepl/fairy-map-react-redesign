import { useState, useRef, useEffect, useCallback } from "react";

export const useAudioPlayer = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState([0]);
  const audioRef = useRef(new Audio(src));

  const play = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateProgress = () => {
      const progressPercent =
        (audioElement.currentTime / audioElement.duration) * 100;
      setProgress([progressPercent]);
      setCurrentTime(audioElement.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", updateProgress);
    audioElement.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
      audioElement.removeEventListener("loadedmetadata", setAudioDuration);
      audioElement.pause();
    };
  }, [src]);

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
  };

  return {
    audioRef,
    progress,
    isPlaying,
    duration,
    currentTime,
    play,
    pause,
    seek,
  };
};
