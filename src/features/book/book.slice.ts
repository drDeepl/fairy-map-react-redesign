import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Components } from "@/api/schemas/client";
import { fetchAudiosByBookId } from "./book.actions";

export interface BookState extends BaseAppState {
  selectedBook: Components.Schemas.StoryWithImgResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const initialState = {
  loading: false,
  success: false,
  error: undefined,
  selectedBook: null,
  audios: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (
      state,
      action: PayloadAction<Components.Schemas.StoryWithImgResponseDto | null>
    ) => {
      state.selectedBook = action.payload as any;
    },
    addAudio: (
      state,
      action: PayloadAction<Components.Schemas.AudioStoryResponseDto>
    ) => {
      const audio = action.payload as never;
      state.audios.unshift(audio);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudiosByBookId.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        fetchAudiosByBookId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.audios = action.payload;
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(
        fetchAudiosByBookId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as any;
        }
      );
  },
});
export const { setBook, addAudio } = bookSlice.actions;

export default bookSlice.reducer;
