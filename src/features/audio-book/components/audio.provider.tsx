// AudioContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";

// Типы для трека и состояния плеера
interface Track {
  src: string;
}

interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
}

interface AudioPlayerContextType {
  progress: number[];
  duration: number;
  currentTime: number;
  state: AudioPlayerState;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

// Создание контекста
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

interface AudioProviderProps {
  children: ReactNode;
}

// Провайдер для аудиоплеера
const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTrack: null,
    volume: 0.5,
  });

  const [progress, setProgress] = useState<number[]>([0]);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<Track[]>([]);
  const currentIndexRef = useRef<number>(-1);

  // Инициализация аудио элемента
  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();

      const updateProgress = () => {
        const progressPercent =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress([progressPercent]);
        setCurrentTime(audioRef.current.currentTime);
      };

      const setAudioData = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.addEventListener("loadedmetadata", setAudioData);

      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleTrackEnd);
    }
    return audioRef.current;
  }, []);

  // Воспроизведение трека
  const play = useCallback(
    (track: Track) => {
      const audio = initializeAudio();

      // Остановка текущего трека
      if (state.isPlaying) {
        audio.pause();
      }

      audio.src = track.src;
      audio.volume = state.volume;
      audio.play();

      setState((prev) => ({
        ...prev,
        isPlaying: true,
        currentTrack: track,
      }));
    },
    [state.volume]
  );

  // Пауза
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Возобновление
  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (audio && state.currentTrack) {
      audio.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, [state.currentTrack]);

  // Установка громкости
  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      setState((prev) => ({ ...prev, volume }));
    }
  }, []);

  // Обработка окончания трека
  const handleTrackEnd = useCallback(() => {
    nextTrack();
  }, []);

  // Следующий трек
  const nextTrack = useCallback(() => {
    const playlist = playlistRef.current;
    if (playlist.length === 0) return;

    currentIndexRef.current = (currentIndexRef.current + 1) % playlist.length;

    play(playlist[currentIndexRef.current]);
  }, [play]);

  // Предыдущий трек
  const prevTrack = useCallback(() => {
    const playlist = playlistRef.current;
    if (playlist.length === 0) return;

    currentIndexRef.current =
      (currentIndexRef.current - 1 + playlist.length) % playlist.length;

    play(playlist[currentIndexRef.current]);
  }, [play]);

  // Значения контекста
  const contextValue = {
    progress,
    duration,
    currentTime,
    state,
    play,
    pause,
    resume,
    setVolume,
    nextTrack,
    prevTrack,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

// Хук для использования аудиоплеера
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);

  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }

  return context;
};

export default AudioProvider;
