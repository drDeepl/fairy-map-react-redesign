import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Components } from "@/api/schemas/client";
import { fetchAudiosByBookId } from "./book.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";

export interface BookState extends BaseAppState {
  selectedBook: Components.Schemas.StoryWithImgResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const initialState = {
  loading: false,
  success: false,
  error: null,
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
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudiosByBookId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchAudiosByBookId.fulfilled,
        (
          state,
          action: PayloadAction<Components.Schemas.AudioStoryResponseDto[]>
        ) => {
          state.audios = action.payload;
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(
        fetchAudiosByBookId.rejected,
        (state, action: PayloadAction<ApiErrorResponse>) => {
          state.loading = false;
          state.error = action.payload as ApiErrorResponse;
        }
      );
  },
});
export const { setBook } = bookSlice.actions;

export default bookSlice.reducer;
