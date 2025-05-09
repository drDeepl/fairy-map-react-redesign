import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PlayIcon } from "lucide-react";

import {
  getStyleApplicationStatus,
  getDescriptionApplicationStatus,
} from "../../helpers/get-description-application-status";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AudioApplicationTableProps {
  onClickAudio: (
    data: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => void;
}

export const createColumns = ({
  onClickAudio,
}: AudioApplicationTableProps): ColumnDef<
  Components.Schemas.AudioApplicationWithUserAudioResponseDto
>[] => [
  {
    accessorKey: "userAudio.originalName",
    header: "озвучка",
    cell: (info) => (
      <Button
        variant="ghost"
        className="border border-baby-blue-800 bg-baby-blue-50 text-slate-800"
        onClick={() => onClickAudio(info.row.original)}
      >
        <span>{info.row.original.userAudio.originalName}</span>
        <PlayIcon />
      </Button>
    ),
  },
  {
    accessorKey: "userAudio.language.name",
    header: "язык озвучки",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "storyName",
    header: "сказка",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "user",
    header: "отправил",
    cell: (info) => {
      const { firstName, lastName } = info.row.original.user;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "status",
    header: "статус",
    cell: (info) => (
      <span
        className={`p-2 ${getStyleApplicationStatus(
          info.row.original.status
        )} font-semibold text-center self-center cursor-default`}
      >
        {getDescriptionApplicationStatus(info.row.original.status)}
      </span>
    ),
  },
  {
    accessorKey: "comment",
    header: "комментарий",
    cell: (info) => (
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="line-clamp-2 cursor-help">
              {info.row.original.comment}
            </span>
          </TooltipTrigger>
          <TooltipContent>{info.row.original.comment}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];
