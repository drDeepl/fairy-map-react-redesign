import apiClient from "@/api/apiClient";
import { handleApiErrorResponse } from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapData = createAsyncThunk(
  "map/fetchMapData",
  async (arg, thunkApi) => {
    try {
      const res = await apiClient.MapController_getMapTopojson();
      return thunkApi.fulfillWithValue(res.data);
    } catch (error) {
      const errorResponse = handleApiErrorResponse(error);
      return thunkApi.rejectWithValue(errorResponse);
    }
  }
);
