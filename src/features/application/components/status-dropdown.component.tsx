import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { ApplicationStatus } from "../constants/application-status.enum";
import {
  getStyleApplicationStatus,
  getDescriptionApplicationStatus,
} from "../helpers/get-description-application-status";

interface StatusDropdownMenuProps {
  currentStatus: string;
  onSelectStatus: (status: string) => Promise<void>;
}
const StatusDropdownMenu: React.FC<StatusDropdownMenuProps> = ({
  currentStatus,
  onSelectStatus,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="status-select__btn"
          variant="secondary"
          className={`${getStyleApplicationStatus(currentStatus)}`}
        >
          <span className="text-center">
            {getDescriptionApplicationStatus(currentStatus)}
          </span>
          <CaretDownIcon id="caret-status-btn" className="animate-rotate-270" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {Object.keys(ApplicationStatus).map((key) => (
          <DropdownMenuItem
            key={key}
            className="font-semibold bg-"
            onClick={() => onSelectStatus(key)}
          >
            {getDescriptionApplicationStatus(key)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdownMenu;
