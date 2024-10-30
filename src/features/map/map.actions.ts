import apiClient from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapData = createAsyncThunk("map/fetchMapData", async () => {
  const response = await apiClient.get("/api/map/map.json");
  console.log(response);

  return response;
});
