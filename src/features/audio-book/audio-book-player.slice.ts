// audioPlayerSlice.ts
import { Components } from "@/api/schemas/client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа состояния аудиоплеера
export interface AudioPlayerState {
  currentAudioBook: Components.Schemas.AudioStoryResponseDto | null;
}

// Начальное состояние
const initialState: AudioPlayerState = {
  currentAudioBook: null,
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
    },
    resetAudioBookPlayerState: () => initialState,
  },
});

export const { loadAudioBook } = audioBookPlayerSlice.actions;

export default audioBookPlayerSlice.reducer;
