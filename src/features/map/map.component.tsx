import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { FeatureCollection, Feature } from "geojson";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

interface EthnicGroupPoint {
  idPoint: number;
  ethnicGroupId: number;
  ethnicGroupName: string;
  latitude: number;
  longitude: number;
}

interface FeatureProperties {
  id: string;
  name: string;
  shapeGroup: string;
  shapeID: string;
  shapeISO: string;
  shapeType: string;
  ethnicGroupsPoints: EthnicGroupPoint[];
}

interface FeatureMap extends Feature {
  properties: FeatureProperties;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface MapComponentProps {
  // features: FeatureCollection;
  features: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ features }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const tooltipDiv = useRef<HTMLDivElement | null>(null);

  const projection = d3
    .geoAlbers()
    .rotate([-105, 0]) //  .rotate([-105,0])
    .center([-10, 65])
    .parallels([50, 70]) //.parallels([52, 64])
    .scale(700)
    .translate([screenSize.width / 2, screenSize.height / 2])
    .precision(0.1);
  // Path
  const path = d3.geoPath();
  const pathGenerator = path.projection(projection);

  const [selectedFeature, setFeature] = useState<FeatureMap | null>(null);

  const zoom = d3.zoom().on("zoom", (event) => {
    const g = d3.select(svgRef.current).select("g");
    g.attr("transform", event.transform);
  });

  function zoomedPath(svg: any, d: any) {
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    const translate = [screenSize.width / 2, screenSize.height / 2];
    const scale = Math.min(
      8,
      0.9 /
        Math.max((x1 - x0) / screenSize.width, (y1 - y0) / screenSize.height)
    );

    svg
      .transition()
      .duration(950)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(translate[0], translate[1])
          .scale(scale)
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      );
  }

  const handleClickPath = useCallback((d: FeatureMap) => {
    const svg = d3.select(svgRef.current);
    d3.selectAll("path").attr("class", "fill-stone-100");
    d3.selectAll("circle").remove();
    const g = svg.select(`#region_${d.properties.id}`);

    g.select("path").attr("class", "fill-orange-500");

    d.properties.ethnicGroupsPoints.map((ethnicGroupPoint) => {
      const point = projection([
        ethnicGroupPoint.longitude,
        ethnicGroupPoint.latitude,
      ]);
      g.append("circle")

        .attr("fill", "#82A9FD")
        .attr("cx", point[0])
        .attr("cy", point[1])
        .attr("r", "3")
        .attr("class", "cursor-pointer")
        .on("click", (event, d) => {
          console.log(ethnicGroupPoint);
        });
    });

    zoomedPath(svg, d);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current).style("background-color", "#82A9FD");
    svg.call(zoom);
  }, [features]);

  return (
    <div ref={mapContainerRef}>
      <svg
        ref={svgRef}
        width={screenSize.width}
        height={screenSize.height}
        viewBox={`0 0 ${screenSize.width} ${screenSize.height}`}
      >
        <g>
          {features.map((feature: FeatureMap) => {
            return (
              <g
                id={`region_${feature.properties.id}`}
                key={feature.properties.id}
              >
                <path
                  stroke="#82A9FD"
                  strokeWidth="0.3"
                  onClick={() => {
                    handleClickPath(feature);
                  }}
                  d={pathGenerator(feature)}
                  fill="#FFFFFF"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
