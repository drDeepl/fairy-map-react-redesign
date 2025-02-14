// audio.provider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// Расширенный интерфейс для AudioContextType
export interface AudioContextType {
  currentTrack: string | null;
  isGlobalPlaying: boolean;
  playTrack: (trackSrc: string) => void;
  pauseTrack: () => void;
  useAudioPlayer: (src: string) => AudioPlayerReturn;
  currentActiveAudioPlayers: () => AudioPlayerReturn[];
}

const AudioContext = createContext<AudioContextType | null>(null);

// Тип возвращаемого значения useAudioPlayer
interface AudioPlayerReturn {
  audioRef: React.RefObject<HTMLAudioElement>;
  progress: number[];
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  currentTrack: string;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

// Хук для использования контекста
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};

const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);
  const [activeAudioPlayers, setActiveAudioPlayers] = useState<
    Record<string, AudioPlayerReturn>
  >({});

  const playTrack = useCallback(
    (trackSrc: string) => {
      setCurrentTrack(trackSrc);
      setIsGlobalPlaying(true);

      // Пауза всех других треков
      // Object.values(activeAudioPlayers).forEach((player) => {
      //   if (player.currentTrack !== trackSrc) {
      //     player.pause();
      //   }
      // });
    },
    [activeAudioPlayers]
  );

  const pauseTrack = useCallback(() => {
    setIsGlobalPlaying(false);
  }, []);

  const useAudioPlayer = useCallback(
    (src: string): AudioPlayerReturn => {
      const [isPlaying, setIsPlaying] = useState(false);
      const [duration, setDuration] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);
      const [progress, setProgress] = useState<number[]>([0]);
      const audioRef = React.useRef<HTMLAudioElement>(new Audio(src));

      // Регистрация плеера в контексте
      useEffect(() => {
        const playerInstance: AudioPlayerReturn = {
          audioRef,
          progress,
          isPlaying,
          duration,
          currentTime,
          currentTrack: src,
          play,
          pause,
          seek,
        };

        setActiveAudioPlayers({
          [src]: playerInstance,
        });

        // setActiveAudioPlayers((prev) => ({
        //   ...prev,
        //   [src]: playerInstance,
        // }));

        return () => {
          setActiveAudioPlayers((prev) => {
            const updated = { ...prev };
            delete updated[src];
            return updated;
          });
        };
      }, [src, isPlaying, progress, duration, currentTime]);

      // Синхронизация с глобальным состоянием
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

        // Управление воспроизведением
        if (currentTrack === src) {
          if (isGlobalPlaying) {
            play();
          } else {
            pause();
          }
        }

        return () => {
          audioElement.removeEventListener("timeupdate", updateProgress);
          audioElement.removeEventListener("loadedmetadata", setAudioDuration);
          audioElement.pause();
        };
      }, [src, currentTrack, isGlobalPlaying]);

      const play = useCallback(() => {
        audioRef.current.play();
        setIsPlaying(true);
        playTrack(src);
      }, [src, playTrack]);

      const pause = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
        pauseTrack();
      }, [pauseTrack]);

      const seek = useCallback((time: number) => {
        audioRef.current.currentTime = time;
      }, []);

      return {
        audioRef,
        progress,
        isPlaying,
        duration,
        currentTime,
        currentTrack: src,
        play,
        pause,
        seek,
      };
    },
    [currentTrack, isGlobalPlaying, playTrack, pauseTrack]
  );

  const currentActiveAudioPlayers = useCallback(
    () => Object.values(activeAudioPlayers),
    [activeAudioPlayers]
  );

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isGlobalPlaying,
        playTrack,
        pauseTrack,
        useAudioPlayer,
        currentActiveAudioPlayers,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
