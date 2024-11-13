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
      <AlertTitle className="flex place-items-center space-x-1">
        <AlertCircle className="size-5 self-center align-center" />
        <span>{title}</span>
      </AlertTitle>
      {errors ? (
        <AlertDescription className="pl-6">
          {Object.keys(errors).map((error) => (
            <span key={error}>{errors[error].join("\n")}</span>
          ))}
        </AlertDescription>
      ) : null}
    </Alert>
  );
};
export default ErrorsAlertComponent;
