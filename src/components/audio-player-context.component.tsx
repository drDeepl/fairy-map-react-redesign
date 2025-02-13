import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Создаем сервис-воркер для аудио
const createAudioServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("src/services/audio-service-worker.ts")
      .then((registration) => {
        console.log(
          "Audio Service Worker registered successfully:",
          registration
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};

interface AudioPlayerProps {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

// Компонент аудиоплеера
const AudioPlayerBackground: React.FC<AudioPlayerProps> = ({
  src,
  onPlay,
  onPause,
  onEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Инициализация сервис-воркера
  useEffect(() => {
    createAudioServiceWorker();
  }, []);

  // Обработчик загрузки метаданных
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // Обновление прогресса воспроизведения
  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const progressPercent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  }, []);

  // Обработчик клика по прогресс-бару
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const progressBar = progressRef.current;
      if (!progressBar || !audioRef.current) return;

      const clickPosition =
        (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
      audioRef.current.currentTime = clickPosition * audioRef.current.duration;
    },
    []
  );

  // Управление воспроизведением
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, onPlay, onPause]);

  // Обработчик окончания трека
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnd?.();
  }, [onEnd]);

  // Привязка событий
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", updateProgress);
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("timeupdate", updateProgress);
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [handleLoadedMetadata, updateProgress, handleEnded]);

  return (
    <PlayerContainer>
      <audio ref={audioRef} src={src} preload="metadata" />

      <ControlsContainer>
        <PlayPauseButton onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </PlayPauseButton>

        <ProgressContainer ref={progressRef} onClick={handleProgressClick}>
          <ProgressBar style={{ width: `${progress}%` }} />
        </ProgressContainer>

        <TimeDisplay>
          {`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}
        </TimeDisplay>
      </ControlsContainer>
    </PlayerContainer>
  );
};

// Валидация пропсов
AudioPlayerBackground.propTypes = {
  src: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
};

// Стилизованные компоненты
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlayPauseButton = styled.button`
  padding: 10px;
  margin-right: 10px;
`;

const ProgressContainer = styled.div`
  flex-grow: 1;
  height: 10px;
  background-color: #e0e0e0;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #3f51b5;
`;

const TimeDisplay = styled.div`
  margin-left: 10px;
`;

export default React.memo(AudioPlayerBackground);
