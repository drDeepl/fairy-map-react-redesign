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
  features: FeatureCollection;
}

interface CoordinatesMap {
  long: number;
  lat: number;
}

interface Point {
  x: number;
  y: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ features }) => {
  // TODO: REFACTOR
  // const [heroSelect, setHeroSelect] = useState("batman");
  // const [minHero, setMinHero] = useState(null);
  // const [maxHero, setMaxHero] = useState(null);

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const tooltipDiv = useRef<HTMLDivElement | null>(null);

  const [clickCoords, setClickCoords] = useState<CoordinatesMap | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<{
    feature: any;
    centroid: [number, number];
  } | null>(null);

  const [selectedPath, setPath] = useState<string>("");

  const drawMap = (features: FeatureCollection) => {
    const mapProjection = d3
      .geoAlbers()
      .rotate([-105, 0]) //  .rotate([-105,0])
      .center([-10, 65])
      .parallels([50, 70]) //.parallels([52, 64])
      .scale(700)
      .translate([screenSize.width / 2, screenSize.height / 2])
      .precision(0.1);

    // Path
    const mapPath = d3.geoPath().projection(mapProjection);

    document.body.style.overflow = "hidden";

    const svg = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", screenSize.width)
      .attr("height", screenSize.height)
      .style("background-color", "#82A9FD");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    tooltipDiv.current = d3
      .select(mapContainerRef.current)
      .append("div")
      .attr("class", "map-tooltip")
      .style("opacity", 0);

    // Tooltip

    // Zoom
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([1 / 2, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);

    g.selectAll("path")
      .data(features as any)
      .enter()
      .append("path")
      .attr("d", mapPath)
      .style("stroke", "#82A9FD")
      .style("stroke-width", "0.5")
      .style("fill", "rgb(255,255,225)")
      .attr("class", "region")
      .on("contextmenu", (event: MouseEvent, d) => {
        console.log(event);
        const clickX = event.pageX;
        const clickY = event.pageY;
        const [long, lat] = mapProjection?.invert([clickX, clickY]);
        console.log(
          `Page X: ${clickX}\tPage Y: ${clickY}\nlongitude: ${long}\tlatitude: ${lat}`
        );
        setClickCoords({ long, lat });
        const [x, y] = d3.pointer(event);
        setPoints((prevPoints) => [...prevPoints, { x, y }]);
        // event.preventDefault();
      })
      .on("click", function (event, d) {
        d3.selectAll(".region").style("fill", "rgb(255,255,255)");
        d3.select(this).style("fill", "red");
        const [[x0, y0], [x1, y1]] = mapPath.bounds(d);
        event.stopPropagation();
        svg
          .transition()
          .duration(750)
          .call(
            zoomBehavior.transform,
            d3.zoomIdentity
              .translate(screenSize.width / 2, screenSize.height / 2)
              .scale(
                Math.min(
                  8,
                  0.9 /
                    Math.max(
                      (x1 - x0) / screenSize.width,
                      (y1 - y0) / screenSize.height
                    )
                )
              )
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

  useEffect(() => {
    drawMap(features);
  }, [features, setSelectedRegion]);

  useEffect(() => {
    if (mapContainerRef.current) {
      const svg = d3.select(mapContainerRef.current).select("svg");
      // Обновление точек на карте

      svg
        .selectAll("circle")
        .data(points)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 5)
        .attr("fill", "red");
    }
  }, [points]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        <div ref={mapContainerRef}></div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Coords: {`${JSON.stringify(clickCoords)}`}
        </ContextMenuItem>
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MapComponent;
