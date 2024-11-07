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
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {errors?.array.map((error, idx) => (
          <span key={`error__${idx}`}>{error}</span>
        ))}
      </AlertDescription>
    </Alert>
  );
};
export default ErrorsAlertComponent;
