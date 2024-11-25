import { Components, mapControllerGetMapTopojson } from "@/api/client";
import { handleApiErrorResponse } from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapData = createAsyncThunk(
  "map/fetchMapData",
  async (arg, { rejectWithValue }) => {
    try {
      return await mapControllerGetMapTopojson();
    } catch (error) {
      const errorResponse = handleApiErrorResponse(error);
      return rejectWithValue(errorResponse);
    }
  }
);
