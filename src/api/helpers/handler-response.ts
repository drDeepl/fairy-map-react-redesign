import { isAxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  validationErrors?: Record<string, string[]>;
}

export const handleApiErrorResponse = (error: any): ApiErrorResponse => {
  console.log("handleApiErrorResponse");

  const errorResponse = {
    message: "что-то пошло не так",
    validationErrors: undefined,
  };

  if (isAxiosError(error)) {
    if (typeof error.status === "number") {
      errorResponse.message = error.response?.data.message;

      if (error.response?.data.statusCode === 400) {
        errorResponse.validationErrors = error.response?.data.validationErrors;
      }

      return errorResponse;
    }
    errorResponse.message = "ошибка в интернет соединении";
    return errorResponse;
  }

  return errorResponse;
};
