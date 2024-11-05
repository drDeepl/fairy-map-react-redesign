import { createSlice } from "@reduxjs/toolkit";
import * as turf from "@turf/turf";
import { feature } from "topojson-client";
import { FeatureCollection } from "geojson";
import { fetchMapData } from "./map.actions";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";

export interface MapSlice {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  dataMap: FeatureCollection | null;
}

const initialState: MapSlice = {
  loading: false,
  error: null,
  success: false,
  dataMap: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        const data = action.payload.data;
        const geoJson = feature(data, data.objects.map);

        const simplifyOptions = { tolerance: 0.008, highQuality: false };

        const simplifyFeatures = turf.simplify(geoJson, simplifyOptions);
        state.dataMap = simplifyFeatures.features as FeatureCollection;
        state.loading = false;
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.error = action.payload as ApiErrorResponse;

        state.loading = false;
      });
  },
});

export default mapSlice.reducer;
