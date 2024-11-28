import { ReloadIcon } from "@radix-ui/react-icons";
const LoadSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-full min-w-full">
      <ReloadIcon className="animate-spin size-10 text-slate-700 self-center" />
    </div>
  );
};

export default LoadSpinner;
