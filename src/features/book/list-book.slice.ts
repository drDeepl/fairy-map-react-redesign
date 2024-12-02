import { ApiErrorResponse } from "@/api/helpers/handler-response";

import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBook,
  fetchListBooks,
  fetchListBooksByEthnicGroup,
} from "./book.actions";
import { Components } from "@/api/schemas/client";

export interface ListBookState extends BaseAppState {
  books: Components.Schemas.StoryWithImgResponseDto[];
}

export const initialState: ListBookState = {
  loading: false,
  success: false,
  error: null,
  books: [],
};

const bookListSlice = createSlice({
  name: "listBook",
  initialState,
  reducers: {
    addBook: (
      state,
      action: PayloadAction<Components.Schemas.StoryWithImgResponseDto>
    ) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchListBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchListBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(fetchListBooksByEthnicGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchListBooksByEthnicGroup.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchListBooksByEthnicGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.unshift({ ...action.payload, srcImg: null });
        state.loading = false;
        state.success = true;
      })
      .addCase(createBook.rejected, (state, action) => {
        console.error(action.payload);
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const { addBook } = bookListSlice.actions;

export default bookListSlice.reducer;
