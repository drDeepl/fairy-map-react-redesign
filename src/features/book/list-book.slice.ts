import { ApiErrorResponse } from "@/api/helpers/handler-response";

import { BaseAppState } from "@/common/interfaces/state.interface";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBook,
  getListBooks,
  getListBooksByEthnicGroup,
} from "./book.actions";
import { Components } from "@/api/client";

export interface ListBookState extends BaseAppState {
  books: Components.Schemas.StoryDto[];
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
    addBook: (state, action: PayloadAction<Components.Schemas.StoryDto>) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getListBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getListBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(getListBooksByEthnicGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getListBooksByEthnicGroup.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getListBooksByEthnicGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const { addBook } = bookListSlice.actions;

export default bookListSlice.reducer;
