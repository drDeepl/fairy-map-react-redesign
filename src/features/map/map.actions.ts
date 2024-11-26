import { mapControllerGetMapTopojson } from "@/api/client";
import { handleApiErrorResponse } from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapData = createAsyncThunk(
  "map/fetchMapData",
  async (arg, thunkApi) => {
    try {
      const responseData = await mapControllerGetMapTopojson();
      return thunkApi.fulfillWithValue(responseData.data);
    } catch (error) {
      const errorResponse = handleApiErrorResponse(error);
      return thunkApi.rejectWithValue(errorResponse);
    }
  }
);
