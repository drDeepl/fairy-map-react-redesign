import apiClient from "@/api/apiClient";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { Components } from "@/api/schemas/client";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAudiosByEthnicGroupId = createAsyncThunk(
  "audioBookList\fetchAudiosByStoryId",
  async (ethnicGroupId: number, thunkApi) => {
    try {
      const res = await apiClient.paths[
        "/api/story/audio/ethnic-group/{ethnicGroupId}"
      ].get(ethnicGroupId);
      return res.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const addRatingAudio = createAsyncThunk(
  "audioBookListaddRatingAudio",
  async (dto: Components.Schemas.AddRatingAudioStoryDto, thunkApi) => {
    try {
      const res = await apiClient.paths["/api/story/rating/add"].post(
        null,
        dto
      );

      return res.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const fetchAudiosByStoryId = createAsyncThunk(
  "audioBookList/fetchAudiosByStoryId",
  async (storyId: number, thunkApi) => {
    try {
      const res = await apiClient.paths["/api/story/{storyId}/audio/all"].get({
        storyId,
      });
      return res.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      thunkApi.rejectWithValue(errorResposne);
    }
  }
);
