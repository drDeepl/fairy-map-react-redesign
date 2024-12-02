import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";

export const createBook = createAsyncThunk(
  "book/addBook",
  async (dto: Components.Schemas.AddStoryDto, thunkApi) => {
    try {
      const res = await apiClient.AdminController_addStory(null, dto);
      console.log(res.data);
      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const fetchListBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    try {
      const res = await apiClient.StoryController_getAllStories();

      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const fetchListBooksByEthnicGroup = createAsyncThunk(
  "book/fetchBooksByEthnicGroup",
  async (ethnicGroupId: number, thunkApi) => {
    try {
      const res = await apiClient.StoryController_getStoriesByEthnicGroupId(
        ethnicGroupId
      );

      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const fetchAudiosByBookId = createAsyncThunk(
  "book/fetchAudiosByBookId",
  async (bookId: number, thunkApi) => {
    try {
      const res = await apiClient.StoryController_getLanguagesForCurrentStory(
        bookId
      );
      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);
