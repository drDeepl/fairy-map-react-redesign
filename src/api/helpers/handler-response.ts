import { AxiosError, isAxiosError } from "axios";
import apiClient from "../apiClient";
import { string } from "zod";

export interface ApiErrorResponse {
  message: string;
}

export interface SimpleNetworkError {
  code: string | number;
  message: string;
  name: string;
  stack: string;
}

export const handleApiErrorResponse = (
  error: SimpleNetworkError
): ApiErrorResponse => {};
