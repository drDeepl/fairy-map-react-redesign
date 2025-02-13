// audioPlayerSlice.ts
import { Components } from "@/api/schemas/client";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа состояния аудиоплеера
export interface AudioPlayerState {
  isPlaying: boolean;
  currentAudioBook: Components.Schemas.AudioStoryResponseDto | null;
  currentTime: number;
  progress: number[];
  duration: number;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: AudioPlayerState = {
  isPlaying: false,
  currentAudioBook: null,
  currentTime: 0,
  progress: [0],
  duration: 0,
  isLoading: false,
  error: null,
};

// Создание среза с помощью createSlice
const audioBookPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    // Загрузка трека
    loadAudioBook: (
      state,
      action: PayloadAction<Components.Schemas.AudioStoryResponseDto>
    ) => {
      state.currentAudioBook = action.payload;
      state.isLoading = true;
      state.error = null;
    },

    play: (state) => {
      state.isPlaying = true;
    },

    pause: (state) => {
      state.isPlaying = false;
    },

    setDuration: (
      state,
      action: PayloadAction<{
        duration: number;
      }>
    ) => {
      state.duration = action.payload.duration;
    },

    updateProgress: (
      state,
      action: PayloadAction<{
        progress: number;
        currentTime: number;
      }>
    ) => {
      state.progress = [action.payload.progress];
      state.currentTime = action.payload.currentTime;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    resetAudio: (state) => {
      state = {
        ...state,
        isPlaying: false,
        currentAudioBook: null,
        currentTime: 0,
        progress: [0],
        duration: 0,
        isLoading: false,
        error: null,
      };
    },

    resetAudioBookPlayerState: () => initialState,
  },
});

export const {
  loadAudioBook,
  play,
  pause,
  updateProgress,
  setDuration,
  setError,
  resetAudio,
  resetAudioBookPlayerState,
} = audioBookPlayerSlice.actions;

export default audioBookPlayerSlice.reducer;

export const currentAudioBook = (state: RootState) =>
  state.audioBookPlayer.currentAudioBook;
export const isPlaying = (state: RootState) => state.audioBookPlayer.isPlaying;
export const duration = (state: RootState) => state.audioBookPlayer.duration;
export const progress = (state: RootState) => state.audioBookPlayer.progress;
