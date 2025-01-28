import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  BookAudioIcon,
  BookHeadphones,
  LibraryBig,
  MapPin,
  MapPinIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { EthnicGroupPoint } from "./map.interface";

import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";

import { motion } from "framer-motion";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import SwitchMotion from "@/components/switch-motion";
import { Label } from "@/components/ui/label";

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
  open: boolean;
  load: boolean;
  onlyWithAudio: boolean;
  books: Components.Schemas.StoryBookWithAudiosResponseDto[];
  viewBooks: Components.Schemas.StoryBookWithAudiosResponseDto[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  features,
  width,
  height,
  onClickAudioBook,
  onClickBook,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const projection = useMemo(() => {
    return d3
      .geoAlbers()
      .rotate([-105, 0]) //  .rotate([-105,0])
      .center([-10, 65])
      .parallels([50, 70]) //.parallels([52, 64])
      .scale(700)
      .translate([width / 2, height / 2])
      .precision(0.1);
  }, []);

  const pathGenerator = useMemo(() => {
    const path = d3.geoPath();
    return path.projection(projection);
  }, []);

  const resetTooltip = () => {
    setTooltip({
      open: false,
      y: 0,
      x: 0,
      title: "",
    });
  };

  const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
    if (svgRef.current) {
      resetTooltip();
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

  const handleClickPath = (d: any, pointsClass: string) => {
    resetTooltip();
    const svg = d3.select(svgRef.current);

    const defaultRegionClass = "region fill-stone-100";
    const selectedRegionClass = "region fill-orange-500";

    d3.selectAll(`circle`)
      .style("visibility", "hidden")
      .style("fill", "#82A9FD");

    d3.selectAll("path.region").attr("class", defaultRegionClass);

    const g = svg.select(`#region_${d.properties.id}`);

    g.selectChildren("path").attr("class", selectedRegionClass);

    g.selectChildren();

    g.selectChildren(`circle.${pointsClass}`).style("visibility", "visible");

    zoomedPath(svg, d);
  };

  interface TooltipState {
    open: boolean;
    y: number;
    x: number;
    title: string;
  }

  const [tooltip, setTooltip] = useState<TooltipState>({
    open: false,
    y: 0,
    x: 0,
    title: "",
  });

  const [listBook, setListBook] = useState<ListBookState>({
    open: false,
    load: true,
    books: [],
    onlyWithAudio: false,
    viewBooks: [],
  });

  const handleClickPoint = async (
    e: any,
    ethnicGroupPoint: EthnicGroupPoint
  ) => {
    if (svgRef.current) {
      console.log("handleClickCircle");
      d3.selectAll("circle").style("fill", "#82A9FD");
      const circle: SVGCircleElement = e.target as SVGCircleElement;

      circle.style.fill = "red";

      const rect = circle.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setTooltip({
        open: true,
        x: centerX,
        y: centerY + 10,
        title: ethnicGroupPoint.ethnicGroupName,
      });

      console.log(tooltip);

      const res = await apiClient.paths[
        "/api/story/ethnic-group/books/{ethnicGroupId}"
      ].get({
        ethnicGroupId: ethnicGroupPoint.ethnicGroupId,
      });

      setListBook((prevState) => ({
        ...prevState,
        open: false,
        load: false,
        books: res.data,
        viewBooks: res.data,
      }));
    }
  };

  const renderedFeatures = useMemo(() => {
    return features.map((feature: any) => {
      const d = pathGenerator(feature);
      return (
        <g key={feature.properties.id} id={`region_${feature.properties.id}`}>
          <path
            className="region fill-stone-100"
            stroke="#82A9FD"
            strokeWidth="0.3"
            onClick={() =>
              handleClickPath(
                feature,
                `ethnic-group-point-region-${feature.properties.id}`
              )
            }
            d={d}
            fill="#FFFFFF"
          />
          {feature.properties.ethnicGroupsPoints.map(
            (ethnicGroupPoint: any) => {
              const point = projection([
                ethnicGroupPoint.longitude,
                ethnicGroupPoint.latitude,
              ]);
              if (point) {
                const [cx, cy] = point;
                return (
                  <circle
                    key={`point-${ethnicGroupPoint.idPoint}`}
                    id={`circle-${ethnicGroupPoint.idPoint}`}
                    className={`cursor-pointer ethnic-group-point-region-${feature.properties.id}`}
                    fill="#82A9FD"
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    cx={cx}
                    cy={cy}
                    r={4}
                    onClick={(e) => handleClickPoint(e, ethnicGroupPoint)}
                  />
                );
              }
              return null;
            }
          )}
        </g>
      );
    });
  }, [features, pathGenerator, projection]);

  useEffect(() => {
    if (svgRef.current) {
      const circle = d3.selectAll(`circle`);
      circle.style("visibility", "hidden");

      const svg = d3
        .select<SVGSVGElement, unknown>(svgRef.current)
        .style("background-color", "#82A9FD");
      svg.call(zoom);
    }
  }, []);

  const handleOnCheckedShowAudioStory = (isOn: boolean) => {
    let books = isOn
      ? listBook.books.filter((book) => book.audios.length > 0)
      : listBook.books;

    setListBook((prevState) => ({
      ...prevState,
      onlyWithAudio: isOn,
      viewBooks: books,
    }));
  };

  const handleOpenMenuBooks = (open: boolean) => {
    const icon: HTMLElement | null = document.getElementById("books-menu-icon");
    if (open) {
      icon?.setAttribute("class", "animate-rotate-180");
    } else {
      icon?.setAttribute("class", "animate-rotate-270");
    }

    setListBook((prevState) => ({ ...prevState, open: open }));
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g>{renderedFeatures}</g>
      </svg>
      <motion.div
        className={`absolute px-3 py-4 flex flex-col items-center rounded-lg shadow-md border border-ghost z-50 bg-white -translate-x-[50%]`}
        initial={{ height: 0 }}
        animate={{
          height: tooltip.open ? "8rem" : 0,
          opacity: tooltip.open ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        style={{
          left: tooltip.x,
          top: tooltip.y,
        }}
      >
        <motion.p className="text-xl font-semibold mb-2">
          {tooltip.title}
        </motion.p>

        {listBook.load ? (
          <motion.div className="w-full flex justify-center">
            <Skeleton className="bg-baby-blue-800 h-6 w-48 my-2" />
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center justify-center px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            {listBook.books.length > 0 ? (
              <Popover open={listBook.open} onOpenChange={handleOpenMenuBooks}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-48 mt-3 h-8 p-2 self-center flex justify-center space-x-1 items-center rounded-md bg-slate-100 text-gray-700 border border-slate-300 cursor-pointer [&_svg]:size-6"
                    role="combobox"
                    aria-expanded={open}
                  >
                    <BookHeadphones className="text-slate-600" />
                    <div className="flex items-center space-x-1 text-md">
                      <span className="font-semibold">книги</span>
                      <span>{listBook.books.length}</span>
                    </div>
                    <TriangleDownIcon id="books-menu-icon" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[17rem] h-44 p-0" side="top">
                  <Command>
                    <CommandInput
                      placeholder="введите название книги..."
                      className="h-12"
                    />
                    <CommandList>
                      <CommandEmpty>книги не найдены...</CommandEmpty>
                      <CommandItem className="cursor-pointer w-full flex justify-around">
                        <Button
                          className="flex justify-around p-0"
                          variant="ghost"
                          onClick={() =>
                            handleOnCheckedShowAudioStory(
                              !listBook.onlyWithAudio
                            )
                          }
                        >
                          только книги с озвучками
                          <SwitchMotion isOn={listBook.onlyWithAudio} />
                        </Button>
                      </CommandItem>
                      <CommandGroup>
                        {listBook.viewBooks.map((book) => (
                          <CommandItem
                            className="flex flex-col [&_svg]:size-6 cursor-pointer"
                            key={book.name}
                            value={book.name}
                            onSelect={() => {
                              handleOpenMenuBooks(false);
                            }}
                          >
                            <div className="w-full flex justify-between items-center px-2 ">
                              <span className="text-md  font-semibold">
                                {book.name}
                              </span>
                              <div className="flex items-center space-x-1 self-center  place-self-end">
                                <BookAudioIcon className="size-full text-slate-600" />
                                <span className="text-lg">
                                  {book.audios.length}
                                </span>
                              </div>
                            </div>
                            <Separator />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <p className="text-slate-500">книги не найдены...</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(MapComponent);
