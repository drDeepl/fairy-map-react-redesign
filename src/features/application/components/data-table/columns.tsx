import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PlayIcon } from "lucide-react";
import { getDescriptionApplicationStatus } from "../../helpers/get-description-application-status";

interface AudioApplicationTableProps {
  onClickAudio: (
    data: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => void;
}

export const createColumns = ({
  onClickAudio,
}: AudioApplicationTableProps): ColumnDef<Components.Schemas.AudioApplicationWithUserAudioResponseDto>[] => [
  {
    accessorKey: "userAudio.originalName",
    header: "озвучка",
    cell: (info) => (
      <Button
        variant="ghost"
        className="border border-ghost"
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
    cell: (info) =>
      `${getDescriptionApplicationStatus(info.row.original.status)}`,
  },
  {
    accessorKey: "comment",
    header: "комментарий",
  },
];
