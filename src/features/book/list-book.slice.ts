import { ApiErrorResponse } from "@/api/helpers/handler-response";

import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  createBook,
  fetchListBooks,
  fetchListBooksByEthnicGroup,
  uploadBookCover,
} from "./book.actions";
import { Components } from "@/api/schemas/client";

export interface ListBookState extends BaseAppState {
  books: Components.Schemas.PageResponseDto<
    Components.Schemas.StoryBookResponseDto
  >;
}

export const initialState: ListBookState = {
  loading: false,
  success: false,
  error: undefined,
  books: {
    data: [],
    meta: {
      page: 1,
      take: 10,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};

const bookListSlice = createSlice({
  name: "listBook",
  initialState,
  reducers: {
    addBook: (
      state,
      action: PayloadAction<Components.Schemas.StoryBookResponseDto>
    ) => {
      const books = current(state.books);
      const newMeta = {
        ...books.meta,
        itemCount: books.meta.itemCount + 1,
        pageCount: Math.ceil(books.meta.itemCount + 1 / 10),
      };

      books.data[0] = action.payload;

      state.books = {
        data: books.data,
        meta: newMeta,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListBooks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
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
        state.error = undefined;
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
        state.error = undefined;
        state.success = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        const books = current(state.books);
        const newMeta = {
          ...books.meta,
          itemCount: books.meta.itemCount + 1,
          pageCount: Math.ceil(books.meta.itemCount + 1 / 10),
        };

        books.data[0] = { ...action.payload, srcImg: null };
        state.books = {
          data: books.data,
          meta: newMeta,
        };

        state.loading = false;
        state.success = true;
      })
      .addCase(createBook.rejected, (state, action) => {
        console.error(action.payload);
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(uploadBookCover.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        uploadBookCover.fulfilled,
        (
          state,
          action: PayloadAction<Components.Schemas.StoryBookResponseDto>
        ) => {
          console.log(action.payload);

          const bookIndex = state.books.data.findIndex(
            (book) => action.payload.id === book.id
          );

          state.books.data[bookIndex] = action.payload;

          state.loading = false;
          state.success = true;
        }
      );
  },
});

export const { addBook } = bookListSlice.actions;

export default bookListSlice.reducer;
