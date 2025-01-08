import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PlayIcon } from "lucide-react";
import { ApplicationStatus } from "../../constants/application-status.enum";
import { getDescriptionApplicationStatus } from "../../helpers/get-description-application-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditApplicationState, EditApplicationData } from "../../interfaces";

interface AudioApplicationTableProps {
  onClickAudio: (
    data: Components.Schemas.AudioApplicationWithUserAudioResponseDto
  ) => void;
  onSelectStatus: (data: EditApplicationData) => void;
}

export const createColumns = ({
  onClickAudio,
  onSelectStatus,
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
    cell: (info) => {
      return (
        <Select
          onValueChange={(value: string) =>
            onSelectStatus({
              value: value,
              aplicationId: info.row.original.id,
              comment: info.row.original.comment,
            })
          }
        >
          <SelectTrigger className="font-semibold">
            <SelectValue
              placeholder={getDescriptionApplicationStatus(
                info.row.original.status
              )}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ApplicationStatus).map((key) => (
              <SelectItem key={key} value={key} className="font-semibold">
                {getDescriptionApplicationStatus(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "комментарий",
  },
];
