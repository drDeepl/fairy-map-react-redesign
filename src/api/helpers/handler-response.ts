import { isAxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
}

export const handleApiErrorResponse = (error: any): ApiErrorResponse => {
  const errorResponse = { message: "что-то пошло не так" };

  console.log(error);

  if (isAxiosError(error)) {
    if (typeof error.code === "number") {
      errorResponse.message = error.message;
      return errorResponse;
    }
    errorResponse.message = "возникли проблемы с подключением к сети";
    return errorResponse;
  }
  return errorResponse;
};
