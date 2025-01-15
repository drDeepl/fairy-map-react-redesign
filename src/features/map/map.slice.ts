import { createSlice } from "@reduxjs/toolkit";
import * as turf from "@turf/turf";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { feature } from "topojson";

import { fetchMapData } from "./map.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";
import { FeatureProperties } from "./map.interface";

export interface MapState {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  dataMap: FeatureCollection<Geometry, FeatureProperties> | null;
}

const initialState: MapState = {
  loading: false,
  error: null,
  success: false,
  dataMap: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      state.dataMap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        const data = action.payload.data;
        const geoJson: Feature<Geometry, GeoJsonProperties> = feature(
          data as any,
          data.objects.map as any
        );

        const simplifyOptions = { tolerance: 0.008, highQuality: false };

        const simplifyFeatures = turf.simplify(
          geoJson as any,
          simplifyOptions
        ) as FeatureCollection<Geometry, FeatureProperties>;

        state.dataMap = simplifyFeatures;
        localStorage.setItem("features", JSON.stringify(simplifyFeatures));

        state.loading = false;
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.error = action.payload as ApiErrorResponse;
        state.loading = false;
      });
  },
});

export const { setFeatures } = mapSlice.actions;

export default mapSlice.reducer;
