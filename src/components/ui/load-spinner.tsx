import FeatherIcon from "feather-icons-react";

const LoadSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FeatherIcon icon="rotate-cw" className="animate-spin" />
    </div>
  );
};

export default LoadSpinner;
