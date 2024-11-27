import { Components } from "@/api/schemas/client";
import { ColumnDef } from "@tanstack/react-table";

export const bookTableColumns: ColumnDef<Components.Schemas.StoryDto>[] = [
  {
    accessorKey: "name",
    header: "название",
  },
  {
    accessorKey: "ethnicGroup",
    header: "Этническая группа",
  },
];
