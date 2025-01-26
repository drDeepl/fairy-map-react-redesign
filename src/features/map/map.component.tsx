import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { BookHeadphones, LibraryBig, MapPin, MapPinIcon } from "lucide-react";

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
import { motion, AnimationProps, AnimatePresence } from "framer-motion";
import { TriangleUpIcon } from "@radix-ui/react-icons";

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

  const resetTooltip = async () => {
    setTooltip({
      open: false,
      load: true,
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

  const handleClickPath = useCallback((d: any, pointsClass: string) => {
    setTooltip((prevState) => ({ ...prevState, open: false }));
    const svg = d3.select(svgRef.current);

    const defaultRegionClass = "region fill-stone-100";
    const selectedRegionClass = "region fill-orange-500";

    d3.selectAll(`circle`).style("visibility", "hidden");

    d3.selectAll("path.region").attr("class", defaultRegionClass);

    const g = svg.select(`#region_${d.properties.id}`);

    g.selectChildren("path").attr("class", selectedRegionClass);

    g.selectChildren();

    g.selectChildren(`circle.${pointsClass}`).style("visibility", "visible");

    zoomedPath(svg, d);
  }, []);

  const handleClickPoint = async (ethnicGroupPoint: EthnicGroupPoint) => {
    apiClient.paths["/api/story/ethnic-group/{ethnicGroupId}"]
      .get({
        ethnicGroupId: ethnicGroupPoint.ethnicGroupId,
      })
      .then((result: any) => {
        console.warn(result.data);
        setListBookState({ load: false, books: result.data.data });
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
        setListBookState((prevState) => ({ ...prevState, load: false }));
      });

    dispatch(
      fetchAudiosByEthnicGroupId(ethnicGroupPoint.ethnicGroupId)
    ).unwrap();
  };

  interface TooltipState {
    open: boolean;
    load: boolean;
    y: number;
    x: number;
    title: string;
  }

  const [tooltip, setTooltip] = useState<TooltipState>({
    open: false,
    load: true,
    y: 0,
    x: 0,
    title: "",
  });

  const handleClickCircle = async (
    e: any,
    ethnicGroupPoint: EthnicGroupPoint
  ) => {
    resetTooltip();
    if (svgRef.current) {
      d3.selectAll("circle").style("fill", "#82A9FD");
      const circle: SVGCircleElement = e.target as SVGCircleElement;

      circle.style.fill = "red";

      const rect = circle.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setTooltip((prevState) => ({
        ...prevState,
        open: true,
        x: centerX,
        y: centerY + 10,
        title: ethnicGroupPoint.ethnicGroupName,
      }));

      handleClickPoint(ethnicGroupPoint).then((_) => {
        setTooltip((prevState) => ({
          ...prevState,
          load: false,
        }));
      });
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
                    onClick={(e) => handleClickCircle(e, ethnicGroupPoint)}
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
        initial={{ width: 0 }}
        animate={{
          width: tooltip.open ? "25dvw" : 0,
          opacity: tooltip.open ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        style={{
          left: tooltip.x,
          top: tooltip.y,
        }}
      >
        <p className="text-lg font-semibold">{tooltip.title}</p>
        {tooltip.load ? (
          <div>
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="bg-ghost h-4 w-full my-2" />
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center px-4 py-2 ">
            {audioBookListState.audioStories.length > 0 ? (
              <div className="w-48 self-center flex justify-around items-center rounded-md bg-gray-200 text-gray-700 mt-3 h-8 p-2 cursor-pointer">
                <BookHeadphones className="stroke-gray-600" />
                <span className="text-sm ">аудиокниги</span>
                <span>{audioBookListState.audioStories.length}</span>
              </div>
            ) : (
              <p className="text-slate-500">книги не найдены...</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(MapComponent);
