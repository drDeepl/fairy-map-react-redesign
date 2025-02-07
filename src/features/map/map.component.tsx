import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import colors from "tailwindcss/colors";

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

import { BookAudioIcon, BookHeadphones } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { EthnicGroupPoint } from "./map.interface";

import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import SwitchMotion from "@/components/switch-motion";
import PopoverMotion from "@/components/popover-motion.component";

interface MapProps {
  features: any;
  width: number;
  height: number;

  onClickBook: (
    book: Components.Schemas.StoryBookWithAudiosResponseDto
  ) => Promise<void>;
}

interface ListBookState {
  open: boolean;
  load: boolean;
  onlyWithAudio: boolean;
  books: Components.Schemas.StoryBookWithAudiosResponseDto[];
  viewBooks: Components.Schemas.StoryBookWithAudiosResponseDto[];
}

interface TooltipState {
  open: boolean;
  y: number;
  x: number;
  title: string;
}

const Map: React.FC<MapProps> = ({ features, width, height, onClickBook }) => {
  const svgRef = useRef<SVGSVGElement>(null);

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
    setListBook((prevState) => ({ ...prevState, onlyWithAudio: false }));
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

  const handleClickPath = useCallback((d: any) => {
    setSelectedRegion(d.properties);

    resetTooltip();
    const svg = d3.select(svgRef.current);

    d3.selectAll("path.region").style("fill", colors.slate[100]);
    d3.select(`#region_${d.properties.id}`).style("fill", colors.orange[500]);

    zoomedPath(svg, d);
  }, []);

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

  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  // Варианты анимации для точек
  const pointVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: (index) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  const calculateRadius = useCallback(
    (feature: any) => {
      if (!feature || !feature.geometry) return 0;

      const path = d3.geoPath();
      const area = path.area(feature);

      return Math.sqrt(area / Math.PI);
    },
    [features]
  );

  const renderRegionPoints = useMemo(() => {
    if (!selectedRegion || !features) return null;

    return (
      <AnimatePresence>
        {selectedRegion.ethnicGroupsPoints.map((point: any) => {
          const [x, y] = projection([point.longitude, point.latitude]) || [
            0,
            0,
          ];
          const r = calculateRadius(features[selectedRegion.id - 1]);
          return (
            <motion.circle
              key={point.idPoint}
              id={`circle-${point.idPoint}`}
              cx={x}
              cy={y}
              r={r}
              className={`cursor-pointer ethnic-group-point-region-${selectedRegion.id} z-50`}
              fill="#82A9FD"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              variants={pointVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              exit="hidden"
              onClick={(e) => handleClickPoint(e, point)}
            />
          );
        })}
      </AnimatePresence>
    );
  }, [selectedRegion, features, projection]);

  // Варианты анимации для регионов
  const regionVariants: Variants = {
    hidden: (direction) => ({
      fill: colors.slate[100],
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
      scale: 0.5,
    }),

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      outline: "none",
      fill: colors.slate[100],
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const renderedRegions = useMemo(() => {
    return features.map((feature: any) => {
      const d = pathGenerator(feature);

      return (
        // <g>
        <motion.path
          key={feature.properties.id}
          id={`region_${feature.properties.id}`}
          className="region cursor-pointer"
          stroke={colors.blue[500]}
          strokeWidth={0.5}
          onClick={() => handleClickPath(feature)}
          d={d || ""}
          fill={colors.slate[100]}
          initial="hidden"
          animate="visible"
          variants={regionVariants}
          style={{
            cursor: "pointer",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 },
          }}
        />
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

  const handleOnSelectBook = async (
    book: Components.Schemas.StoryBookWithAudiosResponseDto
  ) => {
    handleOpenMenuBooks(false);
    resetTooltip();
    onClickBook(book);
  };

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
      <motion.svg
        className="cursor-grab w-screen h-screen"
        ref={svgRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <g>
          {renderedRegions}
          {renderRegionPoints}
        </g>
      </motion.svg>

      <PopoverMotion
        open={tooltip.open}
        x={tooltip.x}
        y={tooltip.y}
        onClose={resetTooltip}
        className="flex flex-col items-center justify-center"
      >
        <p className="text-xl font-semibold">{tooltip.title}</p>

        {listBook.load ? (
          <div className="flex justify-center w-full">
            <Skeleton className="w-48 h-6 my-2 bg-baby-blue-200" />
          </div>
        ) : (
          <motion.div
            className="flex items-center justify-center px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {listBook.books.length > 0 ? (
              <Popover open={listBook.open} onOpenChange={handleOpenMenuBooks}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-48 mt-3 h-8 p-2 self-center flex justify-center space-x-1 items-center rounded-md bg-slate-100 text-gray-700 border border-slate-300 cursor-pointer [&_svg]:size-6"
                    role="combobox"
                    aria-expanded={listBook.open}
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
                      <CommandItem className="flex justify-around w-full cursor-pointer">
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
                            onSelect={() => handleOnSelectBook(book)}
                          >
                            <div className="flex items-center justify-between w-full px-2 ">
                              <span className="font-semibold text-md">
                                {book.name}
                              </span>
                              <div className="flex items-center self-center space-x-1 place-self-end">
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
      </PopoverMotion>
    </div>
  );
};

export default React.memo(Map);
