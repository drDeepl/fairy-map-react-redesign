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
  progress: number[];
  duration: number;
  currentTime: number;
}

interface AudioPlayerContextType {
  // progress: number[];
  // duration: number;
  // currentTime: number;
  state: AudioPlayerState;
  error: string | null;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  onProgressChange: (value: number[]) => void;
  setVolume: (volume: number) => void;
  resetError: () => void;
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
    progress: [0],
    duration: 0,
    currentTime: 0,
  });

  const [error, setError] = useState<string | null>(null);

  // const [progress, setProgress] = useState<number[]>([0]);
  // const [duration, setDuration] = useState<number>(0);
  // const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onError = (e: Event) => {
    console.log(e);
    pause();
    setError("ошибка при загрузки озвучки");
  };

  // Инициализация аудио элемента
  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      const audio = audioRef.current;

      const updateProgress = () => {
        const newProgress = (audio.currentTime / audio.duration) * 100;
        setState((prevState) => ({
          ...prevState,
          progress: [newProgress],
          currentTime: audio.currentTime,
        }));
        // setProgress([progressPercent]);
        // setCurrentTime(audio.currentTime);
      };

      const setAudioData = () => {
        setState((prevState) => ({ ...prevState, duration: audio.duration }));
        // setDuration(audio.duration);
      };

      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("error", onError);

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleTrackEnd);
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

      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTrack: track,
      }));
    },
    [state.track]
  );

  // Пауза
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  // Возобновление
  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (audio && state.currentTrack) {
      audio.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, [state.currentTrack]);

  const onProgressChange = (value: number[]) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    console.log(value);
    const newProgress = Number(value[0]);

    audio.currentTime = (newProgress / 100) * state.duration;
    setState((prevState) => ({ ...prevState, progress: [newProgress] }));
    // setProgress(value);
  };

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
    pause();
  }, []);

  // Значения контекста
  const contextValue = {
    // progress,
    // duration,
    // currentTime,
    state,
    error,
    play,
    pause,
    resume,
    setVolume,
    onProgressChange,
    resetError,
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
