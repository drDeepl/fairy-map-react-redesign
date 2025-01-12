interface SuccessToastProps {
  msg: string;
  children?: React.ReactNode;
}

const SuccessToast: React.FC<SuccessToastProps> = ({
  msg,

  children,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span>{msg}</span>
      {children}
    </div>
  );
};

export default SuccessToast;
