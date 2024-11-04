import apiClient from "@/api/apiClient";
import { handleApiErrorResponse } from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapData = createAsyncThunk(
  "map/fetchMapData",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/map/map.json");
      return response;
    } catch (error) {
      const errorResponse = handleApiErrorResponse(error);
      return rejectWithValue(errorResponse);
    }
  }
);
