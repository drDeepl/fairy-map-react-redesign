import { Components } from "@/api/schemas/client";
import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addRatingAudio,
  fetchAudiosByEthnicGroupId,
} from "../audio-book.actions";

export interface AudioBookListState extends BaseAppState {
  audioStories: Components.Schemas.PreviewAudioStoryResponseDto[];
}

export interface UpdateAudioItem {
  storyId: number;
  audio: Components.Schemas.AudioResponseDto;
}

const initialState = {
  loading: true,
  success: false,
  error: undefined,
  audioStories: [],
};

const audioBookListSlice = createSlice({
  name: "audioBookList",
  initialState,
  reducers: {
    updateAudio: (state, action: PayloadAction<UpdateAudioItem>) => {
      const audioStory: any = state.audioStories.find(
        (story: Components.Schemas.PreviewAudioStoryResponseDto) =>
          story.id === action.payload.storyId
      );
      if (audioStory) {
        audioStory.audios.map((audio: Components.Schemas.AudioResponseDto) =>
          audio.id === action.payload.audio.id ? action.payload.audio : audio
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudiosByEthnicGroupId.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        fetchAudiosByEthnicGroupId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.audioStories = action.payload;
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(addRatingAudio.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })

      .addCase(
        addRatingAudio.fulfilled,
        (state, action: PayloadAction<any>) => {
          audioBookListSlice.actions.updateAudio(action.payload);

          state.loading = false;
        }
      )
      .addCase(addRatingAudio.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { updateAudio } = audioBookListSlice.actions;

export default audioBookListSlice.reducer;
