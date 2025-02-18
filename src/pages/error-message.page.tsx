import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageScreen: React.FC<ErrorMessageProps> = ({ message }) => {
  const navigate = useNavigate();

  const handleOnBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute w-1/6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 filter blur-3xl h-2/6 left-2 top-1"></div>
      <div className="absolute w-1/6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 filter blur-3xl h-2/6 right-2 bottom-1"></div>
      <div className="relative z-30 flex flex-col items-center text-center ">
        <div className="flex flex-col justify-center">
          <h1 className="self-start text-4xl font-bold text-slate-500">Упс!</h1>
        </div>
        <h1 className="mt-2 text-2xl text-slate-500">{message}...</h1>
        <Button className="m-2" onClick={handleOnBack} variant="outline">
          <ArrowLeftIcon />
          на главную
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessageScreen;
