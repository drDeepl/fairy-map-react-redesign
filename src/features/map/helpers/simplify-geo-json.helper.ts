import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { feature } from "topojson";
import { FeatureProperties } from "../map.interface";

import { simplify } from "@turf/turf";

export async function simplifyGeoJsonHelper(
  data: any
): Promise<FeatureCollection<Geometry, FeatureProperties>> {
  const geoJson: Feature<Geometry, GeoJsonProperties> = feature(
    data as any,
    data.objects.map as any
  );

  const simplifyOptions = { tolerance: 0.008, highQuality: false };

  return simplify(geoJson as any, simplifyOptions);
}
