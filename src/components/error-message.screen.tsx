interface ErrorMessageProps {
  message: string;
}

const ErrorMessageScreen: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 filter blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-white text-4xl font-bold">{message}</h1>
      </div>
    </div>
  );
};

export default ErrorMessageScreen;
