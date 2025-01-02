import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";

export const fetchLanguages = createAsyncThunk(
  `languageList/fetchLanguages`,
  async (_, thunkApi) => {
    try {
      const res = await apiClient.paths["/api/ethnic-group/language/all"].get();
      return res.data;
    } catch (error) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(error);
      return thunkApi.rejectWithValue(errorResposne as ApiErrorResponse);
    }
  }
);
