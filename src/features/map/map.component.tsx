import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Feature } from "geojson";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookHeadphones, LibraryBig } from "lucide-react";
import { Select, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

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

interface MapComponentProps {
  features: any;
  width: number;
  height: number;
}

interface Tooltip {
  open: boolean;
  data?: EthnicGroupPoint;
}

const MapComponent: React.FC<MapComponentProps> = ({
  features,
  width,
  height,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [tooltip, setTooltip] = useState<Tooltip>({
    open: false,
  });

  const projection = d3
    .geoAlbers()
    .rotate([-105, 0]) //  .rotate([-105,0])
    .center([-10, 65])
    .parallels([50, 70]) //.parallels([52, 64])
    .scale(700)
    .translate([width / 2, height / 2])
    .precision(0.1);
  // Path
  const path = d3.geoPath();
  const pathGenerator = path.projection(projection);

  const zoom = d3.zoom().on("zoom", (event) => {
    const g = d3.select(svgRef.current).select("g");
    g.attr("transform", event.transform);
  });

  function zoomedPath(svg: any, d: any) {
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    const translate = [width / 2, height / 2];
    const scale = Math.min(
      8,
      0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
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
    d3.selectAll("circle").style("opacity", "0");
    const g = svg.select(`#region_${d.properties.id}`);

    g.selectChildren("path").attr("class", "fill-orange-500");

    const circle = g.selectChildren(`circle`);

    circle.style("opacity", "1");

    zoomedPath(svg, d);
  }, []);

  const handleClickPoint = (open: boolean) => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      open: open,
    }));
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current).style("background-color", "#82A9FD");
    svg.call(zoom);
  }, [features]);

  return (
    <div ref={mapContainerRef}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
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
                {feature.properties.ethnicGroupsPoints.map(
                  (ethnicGroupPoint: EthnicGroupPoint) => {
                    const point = projection([
                      ethnicGroupPoint.longitude,
                      ethnicGroupPoint.latitude,
                    ]);
                    return (
                      <DropdownMenu
                        key={ethnicGroupPoint.idPoint}
                        onOpenChange={(open: boolean) => {
                          if (!tooltip.open) {
                            const color = open ? "red" : "#82A9FD";
                            d3.select(
                              `circle#circle-${ethnicGroupPoint.idPoint}`
                            ).attr("fill", color);
                          }
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <circle
                            onClick={() => handleClickPoint(true)}
                            id={`circle-${ethnicGroupPoint.idPoint}`}
                            className={`cursor-pointer opacity-0 ethnic-group-point-region-${feature.properties.id}`}
                            fill="#82A9FD"
                            stroke="#FFFFFF"
                            strokeWidth="0.5"
                            cx={point[0]}
                            cy={point[1]}
                            r="4"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col pb-5 px-8">
                          <DropdownMenuLabel className="text-center text-lg">
                            <p>{ethnicGroupPoint.ethnicGroupName}</p>
                            <p className="text-sm lowercase text-zinc-500 self-center font-normal">
                              {feature.properties.name}
                            </p>
                          </DropdownMenuLabel>

                          <Select>
                            <SelectTrigger className="w-48 border-round-5 bg-gray-200 text-gray-700 mt-5">
                              <LibraryBig className="stroke-gray-600" />
                              <SelectValue placeholder="книги" />
                              <span className="justify-end">0</span>
                            </SelectTrigger>
                          </Select>

                          <Select>
                            <SelectTrigger className="w-48 border-round-5 bg-gray-200 text-gray-700 mt-3">
                              <BookHeadphones className="stroke-gray-600" />
                              <SelectValue placeholder="аудиокниги" />
                              <span className="">0</span>
                            </SelectTrigger>
                          </Select>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
