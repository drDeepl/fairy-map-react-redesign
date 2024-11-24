import {
  Components,
  adminControllerAddStory,
  storyControllerGetAllStories,
  storyControllerGetStoriesByEthnicGroupId,
  storyControllerGetStoriesByEthnicGroupIdRaw,
} from "@/api/client";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBook = createAsyncThunk(
  "book/addBook",
  async (dto: Components.Schemas.AddStoryDto, { rejectWithValue }) => {
    try {
      return await adminControllerAddStory(null, dto);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);

export const getListBooks = createAsyncThunk(
  "book/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      return await storyControllerGetAllStories();
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);

export const getListBooksByEthnicGroup = createAsyncThunk(
  "book/getBooksByEthnicGroup",
  async (ethnicGroupId: number, { rejectWithValue }) => {
    try {
      return await storyControllerGetStoriesByEthnicGroupIdRaw(ethnicGroupId);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return rejectWithValue(errorResposne);
    }
  }
);
