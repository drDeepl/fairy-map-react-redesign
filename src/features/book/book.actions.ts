import apiClient from "@/api/apiClient";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookByEthnicGroup = createAsyncThunk(
  "book/getBookByEthnicGroup",
  async (ethnicGroupId: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/api/story/ethnic-group/${ethnicGroupId}`
      );
      return response.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);
