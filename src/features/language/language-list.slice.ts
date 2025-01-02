import { ApiErrorResponse } from "@/api/helpers/handler-response";
import { Components } from "@/api/schemas/client";
import { createSlice } from "@reduxjs/toolkit";
import { fetchLanguages } from "./language.actions";

export interface LanguageListState {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  languages: Components.Schemas.LanguageDto[];
}

const initialState: LanguageListState = {
  loading: false,
  error: null,
  success: false,
  languages: [],
};

const languageListSlice = createSlice({
  name: "languageList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.loading = false;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.error = action.payload as ApiErrorResponse;
        state.loading = false;
      });
  },
});

export const {} = languageListSlice.actions;

export default languageListSlice.reducer;
