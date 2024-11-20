import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenu,
} from "@/components/ui/context-menu";

interface ScreenSize {
  width: number;
  height: number;
}

interface MapComponentProps {
  // features: FeatureCollection;
  features: any;
}

interface CoordinatesMap {
  long: number;
  lat: number;
}

interface Point {
  longitude: number;
  latitude: number;
}

const testPoints: Point[] = [
  {
    longitude: 113.2377372098928,
    latitude: 74.82238189130301,
  },
  {
    longitude: 125.75427779651253,
    latitude: 76.3624417881254,
  },
  {
    longitude: 109.14429686582179,
    latitude: 63.51489294696842,
  },
];

const MapComponent: React.FC<MapComponentProps> = ({ features }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const tooltipDiv = useRef<HTMLDivElement | null>(null);

  const [points, setPoints] = useState<Point[]>([]);

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

  const drawMap = (features: FeatureCollection) => {
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
    console.log(pathGenerator);

    document.body.style.overflow = "hidden";

    const svg = d3.select(svgRef.current).style("background-color", "#82A9FD");

    svg.selectAll("*").remove();

    // Zoom
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([1 / 2, 2])
      .on("zoom", (event, d) => {
        // svg.selectAll("path").attr("transform", event.transform);
        const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
        svg
          .transition()
          .duration(1000)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(screenSize.width / 2, screenSize.height / 2)
              .scale(
                Math.min(
                  22,
                  0.9 /
                    Math.max(
                      (x1 - x0) / screenSize.width,
                      (y1 - y0) / screenSize.height
                    )
                )
              )
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, svg.node())
          );
      });

    svg.call(zoomBehavior);

    svg
      .append("g")
      .selectAll("path")
      .data(features as any)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .style("stroke", "#82A9FD")
      .style("stroke-width", "0.5")
      .style("fill", "rgb(255,255,225)")
      .attr("class", "region")
      .on("click", function (event, d) {
        d3.selectAll(".region").style("fill", "rgb(255,255,255)");
        d3.select(event.target).style("fill", "rgba(255,0,0,0.5");
        console.log(event.target);

        const [longitude, latitude] = d.geometry.coordinates[0][0];

        console.log(`long: ${longitude}\t lat: ${latitude}`);

        const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
        const translate = [screenSize.width / 2, screenSize.height / 2];
        const scale = Math.min(
          8,
          0.9 /
            Math.max(
              (x1 - x0) / screenSize.width,
              (y1 - y0) / screenSize.height
            )
        );

        event.stopPropagation();
        svg
          .transition()
          .duration(1000)
          .call(
            zoomBehavior.transform,
            d3.zoomIdentity
              .translate(translate[0], translate[1])
              .scale(scale)
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
          );
      });

    // TODO: REFACTOR

    // const getHeroFilePath = () => {
    //   return `http:localhost:5173/${heroSelect}.csv`;
    // };

    // const drawHeroCircles = (mapProjection, g) => {
    //   const heroFilePath = getHeroFilePath();
    //   g.selectAll("circle").remove();

    //   d3.csv(heroFilePath).then((heroData) => {
    //     console.log(heroData);
    //     findMinAndMaxHero(heroData);

    //     g.selectAll("circle")
    //       .data(heroData)
    //       .enter()
    //       .append("circle")
    //       .attr("cx", (d) => mapProjection([d.lon, d.lat])[0])
    //       .attr("cy", (d) => mapProjection([d.lon, d.lat])[1])
    //       .attr("r", (d) => calculateRadius(d.metric))
    //       .style("fill", "rgb(30,166,191)")
    //       .style("opacity", 0.85)
    //       .on("mouseover", (event, d) => {
    //         tooltipDiv.current.transition().duration(200).style("opacity", 0.9);
    //         tooltipDiv.current
    //           .text(`${d.place} - ${d.metric}`)
    //           .style("left", `${event.pageX}px`)
    //           .style("top", `${event.pageY - 28}px`);
    //       })
    //       .on("mouseout", () => {
    //         tooltipDiv.current.transition().duration(500).style("opacity", 0);
    //       });
    //   });
    // };

    // drawHeroCircles(mapProjection, g);

    // const findMinAndMaxHero = (heroData) => {
    //   const metrics = heroData.map((d) => +d.metric);
    //   setMinHero(Math.min(...metrics));
    //   setMaxHero(Math.max(...metrics));
    // };

    // const calculateRadius = (metric) => {
    //   // Add your calculation logic here
    //   return 5; // Placeholder value
    // };
  };

  const handleClickPath = (event, d) => {
    const svg = d3.select(svgRef.current);
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    const translate = [screenSize.width / 2, screenSize.height / 2];
    const scale = Math.min(
      8,
      0.9 /
        Math.max((x1 - x0) / screenSize.width, (y1 - y0) / screenSize.height)
    );

    event.stopPropagation();
    svg
      .transition()
      .duration(1000)
      .call(
        zoomBehavior.transform,
        d3.zoomIdentity
          .translate(translate[0], translate[1])
          .scale(scale)
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      );
  };

  const [selectedRegion, setRegion] = useState(null);

  const zoom = d3.zoom().on("zoom", (event) => {
    const g = d3.select(svgRef.current).select("g");
    g.attr("transform", event.transform);
  });

  useEffect(() => {
    // drawMap(features);
    const svg = d3.select(svgRef.current).style("background-color", "#82A9FD");
    svg.on("click", function (event, d) {
      console.log(event.target);

      d3.select(event.target).style("fill", "red");
    });

    svg.call(zoom);
  }, [features]);

  useEffect(() => {}, [selectedRegion]);

  return (
    <div ref={mapContainerRef}>
      <svg
        ref={svgRef}
        width={screenSize.width}
        height={screenSize.height}
        viewBox={`0 0 ${screenSize.width} ${screenSize.height}`}
      >
        <g>
          {features.map((d) => (
            <path
              key={d.properties.id}
              // onClick={() => setRegion(d)}
              d={pathGenerator(d)}
              fill="#FFFFFF"
              stroke="#82A9FD"
              strokeWidth="0.3"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
