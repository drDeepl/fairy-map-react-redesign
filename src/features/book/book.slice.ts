import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice } from "@reduxjs/toolkit";

import { Components } from "@/api/client";

export interface BookState extends BaseAppState {
  bookData: Components.Schemas.StoryDto | null;
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
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
