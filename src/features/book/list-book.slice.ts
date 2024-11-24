import { ApiErrorResponse } from "@/api/helpers/handler-response";
import { components } from "@/api/schema/schema";
import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  addBook,
  getBookByEthnicGroup,
  getListBooks,
  getListBooksByEthnicGroup,
} from "./book.actions";

export interface ListBookState extends BaseAppState {
  books: Array<components["schemas"]["StoryDto"]>;
}

const initialState: ListBookState = {
  loading: false,
  success: false,
  error: null,
  books: [],
};
const bookSlice = createSlice({
  name: "listBook",
  initialState,
  reducers: {},
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
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
