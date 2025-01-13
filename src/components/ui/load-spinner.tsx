import { ReloadIcon } from "@radix-ui/react-icons";
import { Skeleton } from "./skeleton";
import { MapPinned } from "lucide-react";
const LoadSpinner: React.FC = () => {
  return (
    <div className="bg-[url(/welcome-page-bg.png)] bg-center bg-scroll">
      <div className="flex flex-col items-center justify-center justify-items-center min-h-screen min-w-screen backdrop-blur-sm bg-gradient-to-t from-orange-50">
        {/* <ReloadIcon className="animate-jump-heart size-10 text-slate-100 self-center" /> */}

        <div className="animate-jump-heart border border-blue-500 flex flex-col items-center justify-center rounded-full size-36 backdrop-blur-sm bg-gradient-to-b from-blue-200">
          <MapPinned className="size-20 text-blue-400 stroke-[1px] drop-shadow-xl" />
          <span className="animate-pulse text-md text-blue-500 self-center font-semibold -mt-1">
            загрузка
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadSpinner;
