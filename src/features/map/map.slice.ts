import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as turf from "@turf/turf";
import { feature } from "topojson-client";

import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { fetchMapData } from "./map.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";
import { FeatureProperties, MapTopology } from "./map.interface";

export interface MapSlice {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  dataMap: FeatureCollection<Geometry, FeatureProperties> | null;
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
      .addCase(
        fetchMapData.fulfilled,
        (state, action: PayloadAction<MapTopology>) => {
          const data: MapTopology = action.payload;
          const geoJson = feature(data, data.objects.map) as FeatureCollection<
            Geometry,
            GeoJsonProperties
          >;

          const simplifyOptions = { tolerance: 0.008, highQuality: false };

          const simplifyFeatures = turf.simplify(
            geoJson,
            simplifyOptions
          ) as FeatureCollection<Geometry, FeatureProperties>;

          state.dataMap = simplifyFeatures;

          state.loading = false;
        }
      )
      .addCase(fetchMapData.rejected, (state, action) => {
        state.error = action.payload as ApiErrorResponse;

        state.loading = false;
      });
  },
});

export default mapSlice.reducer;
