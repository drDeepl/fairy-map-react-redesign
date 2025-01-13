import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
const LoadSpinner: React.FC = () => {
  return (
    <div className="bg-[url(/welcome-page-bg.png)] bg-center bg-scroll">
      <motion.div
        className={`bg-[url(/welcome-page-bg.png)] bg-center bg-scroll`}
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
      >
        <div className="flex flex-col items-center justify-center justify-items-center min-h-screen min-w-screen backdrop-blur-sm bg-gradient-to-t from-orange-50">
          <motion.div className="animate-jump-heart border border-blue-500 flex flex-col items-center justify-center rounded-full size-36 backdrop-blur-sm bg-gradient-to-b from-blue-200">
            <MapPinned className="size-20 text-blue-400 stroke-[1px] drop-shadow-xl" />
            <span className="animate-pulse text-md text-blue-500 self-center font-semibold -mt-1">
              загрузка
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadSpinner;
