import { ReloadIcon } from "@radix-ui/react-icons";
const LoadSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ReloadIcon className="animate-spin size-10 text-slate-700" />
    </div>
  );
};

export default LoadSpinner;
