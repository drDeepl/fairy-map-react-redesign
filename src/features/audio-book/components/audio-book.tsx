import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { TrackPreviousIcon, TrackNextIcon } from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";
import AudioBookPlaylist from "@/features/book/components/audio-book-playlist.component";
import StarRating from "@/components/star-rating-motion";
import styled from "styled-components";
import TapableButton from "@/components/tapable-button.component";
interface AudioPlayerProps {
  audioBooks: Components.Schemas.AudioStoryResponseDto[];
  onClickRate: (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ) => Promise<number>;
  children?: React.ReactNode;
}

// Стилизованный компонент для контейнера иконки
const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
`;

// Варианты анимации для иконки
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

const AudioBook: React.FC<AudioPlayerProps> = ({
  audioBooks,
  onClickRate,
  children,
}) => {
  const [selectedAudio, setSelectedAudio] = useState<
    Components.Schemas.AudioStoryResponseDto
  >(audioBooks[0]);

  const audioRef = useRef(new Audio(selectedAudio.srcAudio));

  const handleOnClickStar = async (rating: number) => {
    const newRating = await onClickRate(rating, selectedAudio);

    setSelectedAudio((prevState) => ({
      ...prevState,
      commonRating: newRating,
    }));
    return newRating;
  };

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
    <div className="w-full">
      <div className="relative flex flex-col items-center space-y-2">
        <div className="absolute -top-6 left-[45%] bg-slate-950 rounded-full shadow-md">
          <StarRating
            currentRating={selectedAudio.commonRating}
            onClickStar={handleOnClickStar}
          />
        </div>
        <span className="w-12 absolute top-1.5 left-[43.5%] text-orange-500 italic text-md font-bold rounded-full flex justify-center md:text-res-sm">
          {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) / 10}
        </span>
      </div>
      <div className="flex flex-col items-center px-2 py-4 space-x-2 space-y-2 border shadow-md rounded-xl bg-slate-200 border-slate-950">
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
                      widths={`${4}px`}
                      height={`${16}px`}
                      fill="currentColor"
                      initial={{ scaleY: 0.4 }}
                      animate={{ scaleY: 1 }}
                    />
                    <motion.rect
                      x="14"
                      y="4"
                      widths={`${4}px`}
                      height={`${16}px`}
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
        </div>
      </div>
    </div>
  );
};
export default AudioBook;
