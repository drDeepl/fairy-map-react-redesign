import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookHeadphones, LibraryBig } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { EthnicGroupPoint } from "./map.interface";

import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";

import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";

import { fetchAudiosByEthnicGroupId } from "../audio-book/audio-book.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { AudioBookListState } from "../audio-book/components/audio-book-list.slice";
import { Separator } from "@/components/ui/separator";

interface MapComponentProps {
  features: any;
  width: number;
  height: number;
  onClickAudioBook: (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => void;

  onClickBook: (book: Components.Schemas.StoryBookResponseDto) => Promise<void>;
}

interface ListBookState {
  load: boolean;
  books: Components.Schemas.StoryBookResponseDto[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  features,
  width,
  height,
  onClickAudioBook,
  onClickBook,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [listBookState, setListBookState] = useState<ListBookState>({
    load: true,
    books: [],
  });

  const audioBookListState: AudioBookListState = useSelector(
    (state: RootState) => state.audioBookList
  );

  const dispatch = useDispatch<AppDispatch>();

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

  const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
    if (svgRef.current) {
      const g = d3.select<SVGSVGElement, unknown>(svgRef.current).select("g");
      g.attr("transform", event.transform);
    }
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

  const handleClickPath = useCallback((d: any, pointsClass: string) => {
    const svg = d3.select(svgRef.current);

    d3.selectAll(`circle`).style("visibility", "hidden");

    d3.selectAll("path.region").attr("class", "fill-stone-100");

    const g = svg.select(`#region_${d.properties.id}`);
    g.selectChildren("path").attr("class", "fill-orange-500");

    const circle = g.selectChildren(`circle.${pointsClass}`);

    circle.style("visibility", "visible");

    zoomedPath(svg, d);
  }, []);

  const handleClickPoint = async (ethnicGroupPoint: EthnicGroupPoint) => {
    apiClient.paths["/api/story/ethnic-group/{ethnicGroupId}"]
      .get({
        ethnicGroupId: ethnicGroupPoint.ethnicGroupId,
      })
      .then((result: any) => {
        setListBookState({ load: false, books: result.data });
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
        setListBookState((prevState) => ({ ...prevState, load: false }));
      });

    dispatch(fetchAudiosByEthnicGroupId(ethnicGroupPoint.ethnicGroupId)).then(
      (result) => console.log(result)
    );
  };

  useEffect(() => {
    if (svgRef.current) {
      d3.selectAll(`circle`).style("visibility", "hidden");
      const svg = d3
        .select<SVGSVGElement, unknown>(svgRef.current)
        .style("background-color", "#82A9FD");
      svg.call(zoom);
    }
  }, []);

  return (
    <div>
      <Toaster richColors position="top-center" />
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g>
          {features.map((feature: any) => {
            const d = pathGenerator(feature);
            return (
              <g
                id={`region_${feature.properties.id}`}
                key={feature.properties.id}
              >
                <path
                  className="region"
                  stroke="#82A9FD"
                  strokeWidth="0.3"
                  onClick={() => {
                    handleClickPath(
                      feature,
                      `ethnic-group-point-region-${feature.properties.id}`
                    );
                  }}
                  d={`${d}`}
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
                          setListBookState({ load: true, books: [] });

                          let color = "#82A9FD";
                          if (open) {
                            color = "red";
                          }
                          d3.select(
                            `circle#circle-${ethnicGroupPoint.idPoint}`
                          ).attr("fill", color);
                        }}
                      >
                        {point ? (
                          <DropdownMenuTrigger
                            asChild
                            onClick={() => {
                              handleClickPoint(ethnicGroupPoint);
                            }}
                          >
                            <circle
                              id={`circle-${ethnicGroupPoint.idPoint}`}
                              className={`cursor-pointer ethnic-group-point-region-${feature.properties.id}`}
                              fill="#82A9FD"
                              stroke="#FFFFFF"
                              strokeWidth="0.5"
                              cx={point[0]}
                              cy={point[1]}
                              r="4"
                            />
                          </DropdownMenuTrigger>
                        ) : null}
                        <DropdownMenuContent className="flex flex-col pb-5 px-8">
                          <DropdownMenuLabel className="text-center text-lg">
                            <p>{ethnicGroupPoint.ethnicGroupName}</p>
                            <p className="text-sm lowercase text-zinc-500 self-center font-normal">
                              {feature.properties.name}
                            </p>
                          </DropdownMenuLabel>
                          {listBookState.load ? (
                            <Skeleton className="flex self-center w-48 h-8 bg-neutral-300" />
                          ) : (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="w-48 self-center flex justify-center items-center rounded-md bg-gray-200 text-gray-700 mt-3 h-8 p-2 cursor-pointer">
                                <LibraryBig className="stroke-gray-600" />
                                <span className="text-sm">книги</span>
                                <span className="">
                                  {listBookState.books.length}
                                </span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  {listBookState.books.length > 0 ? (
                                    listBookState.books.map((book) => (
                                      <DropdownMenuItem
                                        key={book.id}
                                        className="flex flex-col hover:bg-slate-100"
                                        onClick={() => onClickBook(book)}
                                      >
                                        <Separator />
                                        <span className="font-semibold p-2 cursor-pointer">
                                          {book.name}
                                        </span>
                                      </DropdownMenuItem>
                                    ))
                                  ) : (
                                    <DropdownMenuItem>
                                      книги не найдены
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          )}
                          {audioBookListState.loading ? (
                            <Skeleton className="w-48 flex self-center h-8 mt-3 bg-neutral-300" />
                          ) : (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="w-48 self-center flex justify-around items-center rounded-md bg-gray-200 text-gray-700 mt-3 h-8 p-2 cursor-pointer">
                                <BookHeadphones className="stroke-gray-600" />
                                <span className="text-sm ">аудиокниги</span>
                                <span>
                                  {audioBookListState.audioStories.length}
                                </span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  {audioBookListState.audioStories.length >
                                  0 ? (
                                    audioBookListState.audioStories.map(
                                      (
                                        storyAudio: Components.Schemas.PreviewAudioStoryResponseDto
                                      ) => {
                                        return (
                                          <DropdownMenuItem
                                            className="flex flex-col items-center hover:bg-slate-100"
                                            key={storyAudio.id}
                                            onClick={() =>
                                              onClickAudioBook(storyAudio)
                                            }
                                          >
                                            <Separator />
                                            <span className="font-semibold p-2 cursor-pointer">
                                              {storyAudio.name}
                                            </span>
                                          </DropdownMenuItem>
                                        );
                                      }
                                    )
                                  ) : (
                                    <DropdownMenuItem>
                                      <span>Аудиокниги не найдены</span>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          )}
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

export default React.memo(MapComponent);
