import { RouteApp } from "@/pages/constants/route.enum";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface ErrorMessageProps {
  message: string;
  routeBack: RouteApp;
}

const ErrorMessageScreen: React.FC<ErrorMessageProps> = ({
  message,
  routeBack = RouteApp.HomePage,
}) => {
  const navigate = useNavigate();

  const handleOnBack = () => {
    navigate(routeBack);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 filter blur-3xl h-2/6 w-1/6 left-2 top-1"></div>
      <div className="absolute bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 filter blur-3xl h-2/6 w-1/6 right-2 bottom-1"></div>
      <div className="relative z-30 flex flex-col items-center text-center ">
        <div className="flex flex-col justify-center">
          <CrossCircledIcon className="self-center mb-3 size-14 text-red-400" />
          <h1 className="text-slate-500 text-4xl font-bold self-start">Упс!</h1>
        </div>
        <h1 className="mt-2 text-slate-500 text-2xl">{message}...</h1>
        <Button className="m-2" onClick={handleOnBack} variant="outline">
          <ArrowLeftIcon />
          назад
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessageScreen;
