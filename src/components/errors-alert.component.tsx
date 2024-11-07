import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle } from "lucide-react";

interface ErrorsAlertProps {
  title: string;
  errors?: Record<string, string[]>;
}

const ErrorsAlertComponent: React.FC<ErrorsAlertProps> = ({
  title,
  errors,
}) => {
  console.log(errors);
  return (
    <Alert variant="destructive">
      <div className="flex align-center space-x-2">
        <AlertCircle className="size-5" />
        <AlertTitle className="self-center">{title}</AlertTitle>
      </div>
      {errors ? (
        <AlertDescription className="">
          {Object.keys(errors).map((error) => (
            <p>{errors[error].join("\n")}</p>
          ))}
        </AlertDescription>
      ) : null}
    </Alert>
  );
};
export default ErrorsAlertComponent;
