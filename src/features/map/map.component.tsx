import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Feature } from "geojson";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookHeadphones, LibraryBig, Loader2 } from "lucide-react";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchAudiosByBookId,
  fetchListBooksByEthnicGroup,
} from "../book/book.actions";
import { Skeleton } from "@/components/ui/skeleton";
import { ListBookState } from "../book/list-book.slice";
import { EthnicGroupPoint, FeatureMap } from "./map.interface";
import BookInfoCardComponent from "../book/components/book-info-card.component";
import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { setBook } from "../book/book.slice";

interface MapComponentProps {
  features: any;
  width: number;
  height: number;
  onClickBook: (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => Promise<void>;
}

interface Tooltip {
  open: boolean;
  data?: EthnicGroupPoint;
}

interface SelectedBookState {
  load: boolean;
  book: Components.Schemas.StoryWithImgResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  features,
  width,
  height,
  onClickBook,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );

  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

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

  useEffect(() => {
    if (tooltip?.open) {
      if (tooltip.data) {
        dispatch(fetchListBooksByEthnicGroup(tooltip.data.ethnicGroupId));
      }
    }
  }, [tooltip]);

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

  const handleClickPoint = useCallback((ethnicGroupPoint: EthnicGroupPoint) => {
    console.log("handleClickPoint");
    console.log(ethnicGroupPoint);
    dispatch(fetchListBooksByEthnicGroup(ethnicGroupPoint.ethnicGroupId));
  });

  const [loadBook, setLoadBook] = useState<boolean>(false);

  const handleOnClickBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    setLoadBook(true);
    onClickBook(book).then(() => {
      setLoadBook(false);
    });
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current).style("background-color", "#82A9FD");
    svg.call(zoom);
  }, [features]);

  useEffect(() => {
    if (listBookState.success) {
      console.log(listBookState.books);
    }
  }, [listBookState]);

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
                        modal={false}
                        onOpenChange={(open: boolean) => {
                          const color = open ? "red" : "#82A9FD";
                          d3.select(
                            `circle#circle-${ethnicGroupPoint.idPoint}`
                          ).attr("fill", color);

                          if (open) {
                            handleClickPoint(ethnicGroupPoint);
                          }
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <circle
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
                          {listBookState.loading ? (
                            <Skeleton className="w-48 h-8" />
                          ) : (
                            <Select>
                              <SelectTrigger className="w-48 border-round-5 bg-gray-200 text-gray-700 mt-5">
                                <LibraryBig className="stroke-gray-600" />
                                <SelectValue placeholder="книги" />
                                <span className="justify-end">
                                  {listBookState.books.length}
                                </span>
                              </SelectTrigger>
                              <SelectContent>
                                {listBookState.books.map((book) => (
                                  <Button
                                    className="w-full"
                                    variant="ghost"
                                    disabled={loadBook}
                                    key={book.id}
                                    onClick={() => handleOnClickBook(book)}
                                  >
                                    {loadBook ? (
                                      <Loader2 className="animate-spin" />
                                    ) : null}

                                    {book.name}
                                  </Button>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

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
