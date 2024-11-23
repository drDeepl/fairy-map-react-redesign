import { ApiErrorResponse } from "@/api/helpers/handler-response";
import { components } from "@/api/schema/schema";
import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getBookByEthnicGroup } from "./book.actions";

export interface BookState extends BaseAppState {
  bookData: components["schemas"]["StoryDto"] | null;
}

const initialState: BookState = {
  loading: false,
  success: false,
  error: null,
  bookData: null,
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookByEthnicGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBookByEthnicGroup.fulfilled, (state, action) => {
        state.bookData = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getBookByEthnicGroup.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
